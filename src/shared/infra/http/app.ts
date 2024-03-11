import 'reflect-metadata'
import swaggerUi from 'swagger-ui-express'
import '../container'
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express'
import swaggerFile from '../../../swagger.json'
import routes from './routes'
import AppError from '@shared/errors/AppError'

const app = express()

app.use(express.json({ limit: '50mb' }) as RequestHandler)

app.use('*/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ message: err.message, status: err.statusCode })
  }
  console.log(err)

  return response
    .status(500)
    .json({ message: 'Internal server AppError', status: 500 })
})

export { app }
