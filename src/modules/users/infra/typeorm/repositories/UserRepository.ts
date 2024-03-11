import { Repository } from 'typeorm'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { User } from '../entities/User'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { AppDataSource } from '../../../../../shared/infra/database/data_source'

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async findById(id: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } })
  }

  async update(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  async getAll(): Promise<User[]> {
    return this.ormRepository.find()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } })
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(user)

    await this.ormRepository.save(newUser)

    return newUser
  }
}
