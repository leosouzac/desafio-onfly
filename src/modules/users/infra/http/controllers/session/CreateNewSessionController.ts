import { CreateNewSessionService } from '@modules/users/services/session/CreateNewSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateNewSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
console.log(email, password)
    const createNewSessionService = container.resolve(CreateNewSessionService);

    const session = await createNewSessionService.execute(
      email,
      password,
    );

    return response.json(session).status(201);
  }
}
