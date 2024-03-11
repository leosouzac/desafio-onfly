import { inject, injectable } from 'tsyringe'
import { IExpenseRepository } from '../repositories/IExpenseRepository'
import { Expense } from '../infra/typeorm/entities/Expense'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
  user_id: string
  description: string
  amount: number,
  date: Date
}
@injectable()
export class UpdateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  async execute({ description, amount, user_id, id, date }: IRequest): Promise<Expense> {
    if(amount < 0){
      throw new AppError('Amount needs to be positive', 400)
    }

    if(date > new Date()){
      throw new AppError('Cant save future expenses', 400)
    }

    const foundExpense = await this.expenseRepository.findById(id)

    if (!foundExpense) {
      throw new AppError('Expense not found', 400)
    }

    if(foundExpense.user_id !== user_id){
      throw new AppError('User has no permission to update this expense', 403)
    }

    const updatedCar = await this.expenseRepository.update({
      ...foundExpense,
      description: description || foundExpense.description,
      amount: amount || foundExpense.amount,
      date: date || foundExpense.date
    })

    return updatedCar
  }
}
