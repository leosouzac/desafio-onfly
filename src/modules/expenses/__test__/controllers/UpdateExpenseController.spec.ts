import { v4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { UpdateExpenseService } from '../../services/UpdateExpenseService'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'
import request from 'supertest'
import { User } from 'modules/users/infra/typeorm/entities/User'

jest.mock('../../../expenses/services/UpdateExpenseService')
const updateExpenseServiceMock = UpdateExpenseService as jest.MockedClass<
  typeof UpdateExpenseService
>
let token: string
let user: User

describe('Update car controller test', () => {
  beforeAll(async () => {
    const responseUser = await request(app).post('/user').send({
      name: 'test',
      email: 'teste2@teste.com',
      password: 'teste',
    })

    user = responseUser.body
    const response = await request(app).post('/sessions').send({
      email: 'teste2@teste.com',
      password: 'teste',
    })
    token = response.body.token
  })

  beforeEach(async () => {
    updateExpenseServiceMock.mockClear()
  })

  it('should be able to update a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.description = 'Hotel'
    expense.amount = 2000
    expense.user_id = user.id

    updateExpenseServiceMock.prototype.execute.mockResolvedValueOnce(expense)

    const response = await request(app)
      .put('/expenses')
      .send({
        description: expense.description,
        amount: expense.amount,
        id: expense.id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
    expect(response.body).toEqual(expense)
    expect(updateExpenseServiceMock.prototype.execute).toHaveBeenCalledTimes(1)
  })
})
