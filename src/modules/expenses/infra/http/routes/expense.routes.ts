import { Router } from 'express'
import { CreateExpenseController } from '../controllers/CreateExpenseController'
import { DeleteExpenseController } from '../controllers/DeleteExpenseController'
import { ListExpensesByUserController } from '../controllers/ListExpensesByUserController'
import { UpdateExpenseController } from '../controllers/UpdateExpenseController'
import ensureAuthenticated from '../../../../../shared/infra/middlewares/ensureAuthenticated'

const expenseRouter = Router()

const createCarController = new CreateExpenseController()

const updateCarController = new UpdateExpenseController()

const deleteCarController = new DeleteExpenseController()

const listCasController = new ListExpensesByUserController()

expenseRouter.use(ensureAuthenticated)

expenseRouter.post('/', createCarController.handle)

expenseRouter.get('/', listCasController.handle)

expenseRouter.put('/', updateCarController.handle)

expenseRouter.delete('/:expense_id', deleteCarController.handle)

export { expenseRouter }
