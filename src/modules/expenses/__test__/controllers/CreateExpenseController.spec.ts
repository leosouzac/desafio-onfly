import { v4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { Expense } from '../../../expenses/infra/typeorm/entities/Expense'
import { CreateExpenseService } from '../../../expenses/services/CreateExpenseService'
import request from 'supertest'
import { User } from 'modules/users/infra/typeorm/entities/User'

jest.mock('../../../expenses/services/CreateExpenseService')
const createExpenseServiceMock = CreateExpenseService as jest.MockedClass<
  typeof CreateExpenseService
>

let token: string
let user: User

describe('Create new expense controller test', () => {
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
    createExpenseServiceMock.mockClear()
  })

  it('should be able to create a expense', async () => {
    const newExpense = new Expense()
    newExpense.id = v4()
    newExpense.description = 'Viagem'
    newExpense.amount = 1000
    newExpense.user_id = user.id
    newExpense.date = new Date(2024, 0, 22, 0, 0, 0, 0)

    createExpenseServiceMock.prototype.execute.mockResolvedValueOnce(newExpense)

    const { status, body } = await request(app)
      .post('/expenses')
      .send({
        description: newExpense.description,
        amount: newExpense.amount,
        date: newExpense.date,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(201)
    expect({ ...body, date: new Date(body.date) }).toEqual(newExpense)
    expect(createExpenseServiceMock.prototype.execute).toHaveBeenCalledTimes(1)
  })
})
