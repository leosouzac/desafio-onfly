import { v4 } from 'uuid'
import AppError from '../../../../shared/errors/AppError'
import { ExpenseRepository } from '../../infra/typeorm/repositories/ExpenseRepository'
import { UpdateExpenseService } from '../../../expenses/services/UpdateExpenseService'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'
import { add } from 'date-fns'

jest.mock('../../../expenses/infra/typeorm/repositories/ExpenseRepository')
const expenseRepositoryMock = ExpenseRepository as jest.MockedClass<
  typeof ExpenseRepository
>

describe('Update a car service test', () => {
  let updateExpenseService: UpdateExpenseService

  beforeEach(async () => {
    const expenseRepository = new ExpenseRepository()

    expenseRepositoryMock.mockClear()

    updateExpenseService = new UpdateExpenseService(expenseRepository)
  })

  it('should be able to update a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 2000
    newExpense.user_id = v4()
    newExpense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    newExpense.created_at = new Date()
    newExpense.updated_at = new Date()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)
    expenseRepositoryMock.prototype.update.mockResolvedValue(newExpense)

    const updatedExpense = await updateExpenseService.execute({
      amount: newExpense.amount,
      id: newExpense.id,
      user_id: expense.user_id,
    })

    expect(updatedExpense).toHaveProperty('id')
    expect(updatedExpense.id).toEqual(newExpense.id)
    expect(updatedExpense.amount).toEqual(newExpense.amount)
  })

  it('should not be able to update a expense with negative amount', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = -2000
    newExpense.user_id = v4()
    newExpense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    newExpense.created_at = new Date()
    newExpense.updated_at = new Date()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)
    expenseRepositoryMock.prototype.update.mockResolvedValue(newExpense)

    await expect(
      updateExpenseService.execute({
        amount: newExpense.amount,
        id: newExpense.id,
        user_id: expense.user_id,
      }),
    ).rejects.toEqual(new AppError('Amount needs to be positive', 400))
  })

  it('should not be able to update a expense with future date', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 2000
    newExpense.user_id = v4()
    newExpense.date = add(new Date(), { days: 2 })
    newExpense.created_at = new Date()
    newExpense.updated_at = new Date()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)
    expenseRepositoryMock.prototype.update.mockResolvedValue(newExpense)

    await expect(
      updateExpenseService.execute({
        amount: newExpense.amount,
        id: newExpense.id,
        user_id: expense.user_id,
        date: newExpense.date,
      }),
    ).rejects.toEqual(new AppError('Cant save future expenses', 400))
  })

  it('should not be able to update a non exists expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 2000
    newExpense.user_id = v4()
    expense.date = add(new Date(), { days: 1 })
    newExpense.created_at = new Date()
    newExpense.updated_at = new Date()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(null)

    await expect(
      updateExpenseService.execute({
        amount: newExpense.amount,
        id: newExpense.id,
        user_id: expense.user_id,
      }),
    ).rejects.toEqual(new AppError('Expense not found', 400))
  })

  it('should not be able to update a expense if user is not they owner', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)
    expense.created_at = new Date()
    expense.updated_at = new Date()

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 2000
    newExpense.user_id = v4()
    expense.date = add(new Date(), { days: 1 })
    newExpense.created_at = new Date()
    newExpense.updated_at = new Date()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)

    await expect(
      updateExpenseService.execute({
        amount: newExpense.amount,
        id: newExpense.id,
        user_id: 'teste',
      }),
    ).rejects.toEqual(
      new AppError('User has no permission to update this expense', 403),
    )
  })
})
