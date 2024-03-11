import { v4 } from 'uuid'
import { Repository } from 'typeorm'

import { AppDataSource } from '../../../../shared/infra/database/data_source'
import { IExpenseRepository } from '../../../expenses/repositories/IExpenseRepository'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'
import { ExpenseRepository } from '../../../expenses/infra/typeorm/repositories/ExpenseRepository'
import { format } from 'date-fns'

describe('Expense repository test', () => {
  let ormExpenseRepository: Repository<Expense>
  let expenseRepository: IExpenseRepository

  beforeEach(async () => {
    ormExpenseRepository = AppDataSource.getRepository(Expense)

    expenseRepository = new ExpenseRepository()
  })

  afterEach(async () => {
    await ormExpenseRepository.delete({})
  })

  it('should be able to create a expense', async () => {
    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 1000
    newExpense.user_id = v4()
    newExpense.date = new Date()

    const expense = await expenseRepository.create(newExpense)

    const foundExpense = await ormExpenseRepository.find({
      where: { id: newExpense.id },
    })

    expect(foundExpense).toHaveLength(1)
    expect(foundExpense[0]).toEqual({
      ...expense,
      date: format(expense.date, 'yyyy-MM-dd'),
    })
  })

  it('should be able to update a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 2000
    newExpense.user_id = v4()
    newExpense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    await expenseRepository.create(expense)

    const updatedExpense = await expenseRepository.update(newExpense)

    const foundExpense = await ormExpenseRepository.findOne({
      where: { id: updatedExpense.id },
    })

    expect(foundExpense).not.toBe(null)
    expect(foundExpense.amount).toEqual(updatedExpense.amount)
    expect(foundExpense.id).toEqual(updatedExpense.id)
  })

  it('should be able to delete a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    const deleteExpense = new Expense()
    deleteExpense.id = expense.id

    await expenseRepository.create(expense)

    await expenseRepository.delete(deleteExpense.id)

    const foundExpense = await ormExpenseRepository.findOne({
      where: { id: deleteExpense.id },
    })

    expect(foundExpense).toBe(null)
  })

  it('should be able to find a expense by id', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    await expenseRepository.create(expense)

    const foundExpense = await expenseRepository.findById(expense.id)

    expect(foundExpense).not.toBe(null)
    expect(foundExpense.id).toEqual(expense.id)
  })

  it('should be able to find a expense by user id', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Viagem'
    expense.amount = 1000
    expense.user_id = v4()
    expense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    await expenseRepository.create(expense)

    const foundExpense = await expenseRepository.findByUserId(expense.user_id)

    expect(foundExpense).toHaveLength(1)
  })
})
