import {  ICreateExpenseDTO } from '../../../dto/ICreateExpenseDTO'
import { IExpenseRepository } from '../../../repositories/IExpenseRepository'
import { Expense } from '../entities/Expense'
import { Repository } from 'typeorm'
import { AppDataSource } from '../../../../../shared/infra/database/data_source'

export class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Expense)
  }
  async findByUserId(user_id: string): Promise<Expense[]> {
    return this.ormRepository.find({ where: { user_id } })
  }

  async create(Expense: ICreateExpenseDTO): Promise<Expense> {
    const newExpense = this.ormRepository.create(Expense)

    await this.ormRepository.save(newExpense)

    return newExpense
  }

  async update(Expense: Expense): Promise<Expense> {
    return this.ormRepository.save(Expense)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id })
  }

  async findById(id: string): Promise<Expense | null> {
    return this.ormRepository.findOne({ where: { id } })
  }

  async getAll(): Promise<Expense[]> {
    return this.ormRepository.find()
  }
}
