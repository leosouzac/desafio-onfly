import { v4 } from 'uuid'
import AppError from '../../../../shared/errors/AppError'
import { ExpenseRepository } from '../../infra/typeorm/repositories/ExpenseRepository'
import { CreateExpenseService } from '../../services/CreateExpenseService'
import { UserRepository } from '../../../users/infra/typeorm/repositories/UserRepository'
import { Expense } from '../../infra/typeorm/entities/Expense'
import { User } from '../../../users/infra/typeorm/entities/User'

jest.mock('../../../expenses/infra/typeorm/repositories/ExpenseRepository')
const expenseRepositoryMock = ExpenseRepository as jest.MockedClass<
  typeof ExpenseRepository
>

jest.mock('../../../users/infra/typeorm/repositories/UserRepository')
const userRepositoryMock = UserRepository as jest.MockedClass<
  typeof UserRepository
>

describe('Create new expense service test', () => {
  let createExpenseService: CreateExpenseService

  beforeEach(async () => {
    const expenseRepository = new ExpenseRepository()
    const userRespository = new UserRepository()

    expenseRepositoryMock.mockClear()
    userRepositoryMock.mockClear()

    createExpenseService = new CreateExpenseService(
      expenseRepository,
      userRespository,
    )
  })

  it('should be able to create a expense', async () => {
    const user = new User()
    user.id = v4()

    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    expenseRepositoryMock.prototype.create.mockResolvedValue(expense)
    userRepositoryMock.prototype.findById.mockResolvedValue(user)

    const newExpense = await createExpenseService.execute(expense)

    expect(newExpense).toHaveProperty('id')
    expect(newExpense.id).toEqual(expense.id)
  })

  it('should not be able to create a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = -1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    await expect(createExpenseService.execute(expense)).rejects.toEqual(
      new AppError('Amount needs to be positive', 400),
    )
  })

  it('should not be able to create a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 3, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    await expect(createExpenseService.execute(expense)).rejects.toEqual(
      new AppError('Cant create future expenses', 400),
    )
  })
})
