import { CreateUserService } from '../../../../services/users/CreateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      name,
      email,
      password,
    })

    return response.json(user).status(201)
  }
}
