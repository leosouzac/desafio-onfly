import { CreateExpenseService } from '../../../services/CreateExpenseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateExpenseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, description, date } = request.body

    const user_id = request.user.id

    const createExpenseService = container.resolve(CreateExpenseService)

    const newExpense = await createExpenseService.execute({
      amount,
      description,
      date,
      user_id,
    })

    return response.status(201).json(newExpense)
  }
}
