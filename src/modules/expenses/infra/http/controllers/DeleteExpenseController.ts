import { DeleteExpenseService } from '../../../services/DeleteExpenseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteExpenseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expense_id } = request.params

    const user_id = request.user.id

    const deleteExpenseService = container.resolve(DeleteExpenseService)

    const deleted = await deleteExpenseService.execute(expense_id, user_id)

    return response.status(201).json(deleted)
  }
}
