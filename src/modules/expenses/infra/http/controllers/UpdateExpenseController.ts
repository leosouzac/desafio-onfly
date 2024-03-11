import { UpdateExpenseService } from '../../../services/UpdateExpenseService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateExpenseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, description, id, date } = request.body

    const user_id = request.user.id

    const updateCarService = container.resolve(UpdateExpenseService)

    const updatedCar = await updateCarService.execute({
      amount,
      description,
      id,
      user_id, 
      date
    })

    return response.status(201).json(updatedCar)
  }
}
