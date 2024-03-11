import { ListExpensesByUserService } from '../../../expenses/services/ListExpensesByUserService'
import { ExpenseRepository } from '../../infra/typeorm/repositories/ExpenseRepository'
import { v4 } from 'uuid'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'

jest.mock('../../../expenses/infra/typeorm/repositories/ExpenseRepository')
const expenseRepositoryMock = ExpenseRepository as jest.MockedClass<
  typeof ExpenseRepository
>

describe('List expense service test', () => {
  let listExpensesByUserService: ListExpensesByUserService

  beforeEach(async () => {
    const expenseRepository = new ExpenseRepository()

    expenseRepositoryMock.mockClear()

    listExpensesByUserService = new ListExpensesByUserService(expenseRepository)
  })

  it('should be able to list all expense by user', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    expenseRepositoryMock.prototype.findByUserId.mockResolvedValue([expense])

    const allExpense = await listExpensesByUserService.execute(expense.user_id)

    expect(allExpense).toHaveLength(1)
  })
})
