import { ListExpensesByUserService } from '../../../services/ListExpensesByUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListExpensesByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listExpensesByUserService = container.resolve(ListExpensesByUserService)

    const allExpenses = await listExpensesByUserService.execute(user_id)

    return response.status(201).json(allExpenses)
  }
}
