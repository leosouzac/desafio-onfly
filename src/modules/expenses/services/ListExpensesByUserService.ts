import { inject, injectable } from 'tsyringe'
import { IExpenseRepository } from '../repositories/IExpenseRepository'
import { Expense } from '../infra/typeorm/entities/Expense'

@injectable()
export class ListExpensesByUserService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  async execute(user_id: string): Promise<Expense[]> {
    const foundAllExpensesByUser = await this.expenseRepository.findByUserId(user_id)

    return foundAllExpensesByUser
  }
}
