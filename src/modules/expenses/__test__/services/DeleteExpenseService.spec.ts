import { v4 } from 'uuid'
import AppError from '../../../../shared/errors/AppError'
import { ExpenseRepository } from '../../infra/typeorm/repositories/ExpenseRepository'
import { DeleteExpenseService } from '../../services/DeleteExpenseService'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'

jest.mock('../../../expenses/infra/typeorm/repositories/ExpenseRepository')
const expenseRepositoryMock = ExpenseRepository as jest.MockedClass<
  typeof ExpenseRepository
>

describe('Delete expense service test', () => {
  let deleteExpenseService: DeleteExpenseService

  beforeEach(async () => {
    const expenseRepository = new ExpenseRepository()

    expenseRepositoryMock.mockClear()

    deleteExpenseService = new DeleteExpenseService(expenseRepository)
  })

  it('should be able to delete a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.user_id = v4()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)
    expenseRepositoryMock.prototype.delete.mockResolvedValue()

    const deleted = await deleteExpenseService.execute(
      expense.id,
      expense.user_id,
    )

    expect(expenseRepositoryMock.prototype.delete).toHaveBeenCalled()
    expect(deleted).toEqual(true)
  })

  it('should not be able to delete a non exists exepense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.user_id = v4()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(null)

    await expect(
      deleteExpenseService.execute('teste', expense.user_id),
    ).rejects.toEqual(new AppError('Expense not found', 404))
  })

  it('should not be able to delete expense if user is not her owner', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.user_id = v4()

    expenseRepositoryMock.prototype.findById.mockResolvedValue(expense)

    await expect(
      deleteExpenseService.execute(expense.id, 'teste'),
    ).rejects.toEqual(
      new AppError('User has no permission to delete this expense', 403),
    )
  })
})
