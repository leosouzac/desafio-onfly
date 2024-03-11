import { Router } from 'express'
import { CreateNewSessionController } from '../controllers/session/CreateNewSessionController'

const sessionRouter = Router()

const createNewSessionController = new CreateNewSessionController()

sessionRouter.post('/', createNewSessionController.handle)

export default sessionRouter
