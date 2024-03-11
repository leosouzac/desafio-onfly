import { AppDataSource } from '../../shared/infra/database/data_source'

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterAll(async () => {
  await AppDataSource.destroy()
})
