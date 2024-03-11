import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { ITokenProvider } from '../../providers/models/ITokenProvider'
import { IUserRepository } from '../../repositories/IUserRepository'
import authconfig from '../../../../config/auth'
import { User } from '../../infra/typeorm/entities/User'
import AppError from '../../../../shared/errors/AppError'

export interface IResponse {
  user: User
  token: string
}

@injectable()
export class CreateNewSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const foundUser = await this.userRepository.findByEmail(email)

    if (!foundUser) {
      throw new AppError('Incorrect email', 401)
    }

    const isPassword = await compare(password, foundUser.password)

    if (!isPassword) {
      throw new AppError('Incorrect password', 401)
    }

    const { secret, expiresIn } = authconfig.jwt

    const token = this.tokenProvider.generationToken(
      secret,
      foundUser.id,
      expiresIn,
    )

    return {
      user: { ...foundUser, password },
      token,
    }
  }
}
