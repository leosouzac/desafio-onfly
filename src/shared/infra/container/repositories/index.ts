import { ExpenseRepository } from '../../../../modules/expenses/infra/typeorm/repositories/ExpenseRepository'
import { IExpenseRepository } from '../../../../modules/expenses/repositories/IExpenseRepository'
import { UserRepository } from '../../../../modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '../../../../modules/users/repositories/IUserRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepository,
)
