import { ICreateExpenseDTO } from '../dto/ICreateExpenseDTO'
import {  Expense } from '../infra/typeorm/entities/Expense'

export interface IExpenseRepository {
  create(expense: ICreateExpenseDTO): Promise<Expense>
  update(expense: Expense): Promise<Expense>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Expense | null>
  findByUserId(user_id: string): Promise<Expense[]>
}
