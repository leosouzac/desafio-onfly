import { inject, injectable } from 'tsyringe'
import { ICreateExpenseDTO } from '../dto/ICreateExpenseDTO'
import { IExpenseRepository } from '../repositories/IExpenseRepository'
import { Expense } from '../infra/typeorm/entities/Expense'
import { IUserRepository } from '../../users/repositories/IUserRepository'
import AppError from '../../../shared/errors/AppError'
import { isAfter } from 'date-fns'

@injectable()
export class CreateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    amount,
    description,
    user_id,
    date,
  }: ICreateExpenseDTO): Promise<Expense> {
    if (amount < 0) {
      throw new AppError('Amount needs to be positive', 400)
    }

    if (isAfter(date, new Date())) {
      throw new AppError('Cant create future expenses', 400)
    }

    const foundUser = await this.userRepository.findById(user_id)

    if (!foundUser) {
      throw new AppError('User doenst exists', 400)
    }

    const newExpense = await this.expenseRepository.create({
      amount,
      description,
      user_id,
      date,
    })

    return newExpense
  }
}
