import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { IUserRepository } from '../../repositories/IUserRepository'
import { User } from '../../infra/typeorm/entities/User'
import AppError from '../../../../shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const foundUser = await this.userRepository.findByEmail(email)

    if (foundUser) {
      throw new AppError('User already exists', 400)
    }

    const hashPassword = await hash(password, 8)

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    })

    return {
      ...newUser,
      password: '',
    }
  }
}
