import { inject, injectable } from 'tsyringe'
import { IExpenseRepository } from '../repositories/IExpenseRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import AppError from '@shared/errors/AppError'


@injectable()
export class DeleteExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  async execute(expense_id: string, user_id: string): Promise<boolean> {
    const foundExpense = await this.expenseRepository.findById(expense_id)

    if (!foundExpense) {
      throw new AppError('Expense not found', 404)
    }

    if(foundExpense.user_id !== user_id){
      throw new AppError('User has no permission to delete this expense', 403)
    }

    await this.expenseRepository.delete(expense_id)

    return true
  }
}
