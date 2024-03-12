import { UpdateExpenseService } from '../../../services/UpdateExpenseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateExpenseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, description, id, date } = request.body

    const user_id = request.user.id

    const updateExpenseService = container.resolve(UpdateExpenseService)

    const updatedExpense = await updateExpenseService.execute({
      amount,
      description,
      id,
      user_id,
      date,
    })

    return response.status(201).json(updatedExpense)
  }
}
