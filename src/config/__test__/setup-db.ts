import AppError from '../../shared/errors/AppError'
import { AppDataSource } from '../../shared/infra/database/data_source'

require('ts-node/register')
require('tsconfig-paths/register')

export default async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new AppError('Not in test enviroment!')
  }

  const startTime = new Date().getTime()

  await AppDataSource.initialize()

  const connectTime = new Date().getTime()

  await AppDataSource.runMigrations()

  const migrationsTime = new Date().getTime()

  console.log(
    `\nConnected in ${connectTime - startTime}ms - Executed migrations in ${
      migrationsTime - connectTime
    }ms.\n`,
  )
}
