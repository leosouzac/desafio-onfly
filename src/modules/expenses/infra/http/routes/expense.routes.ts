import { Router } from 'express'
import { CreateExpenseController } from '../controllers/CreateExpenseController'
import { DeleteExpenseController } from '../controllers/DeleteExpenseController'
import { ListExpensesByUserController } from '../controllers/ListExpensesByUserController'
import { UpdateExpenseController } from '../controllers/UpdateExpenseController'
import ensureAuthenticated from '../../../../../shared/infra/middlewares/ensureAuthenticated'

const expenseRouter = Router()

const createExpenseController = new CreateExpenseController()

const updateExpenseController = new UpdateExpenseController()

const deleteExpenseController = new DeleteExpenseController()

const listCasController = new ListExpensesByUserController()

expenseRouter.use(ensureAuthenticated)

expenseRouter.post('/', createExpenseController.handle)

expenseRouter.get('/', listCasController.handle)

expenseRouter.put('/', updateExpenseController.handle)

expenseRouter.delete('/:expense_id', deleteExpenseController.handle)

export { expenseRouter }
