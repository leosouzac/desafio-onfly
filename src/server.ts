import { AppDataSource } from './shared/infra/database/data_source'
import { app } from './shared/infra/http/app'

AppDataSource.initialize().then(() => {
  app.listen(3333, () => {
    console.log('Server started on port 3333')
  })
})
