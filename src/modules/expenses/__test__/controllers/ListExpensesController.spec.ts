import { v4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { Expense } from '../../infra/typeorm/entities/Expense'
import { ListExpensesByUserService } from '../../services/ListExpensesByUserService'
import request from 'supertest'
import { User } from 'modules/users/infra/typeorm/entities/User'

jest.mock('../../../expenses/services/ListExpensesByUserService')
const listExpensesByUserServiceMock =
  ListExpensesByUserService as jest.MockedClass<
    typeof ListExpensesByUserService
  >

let token: string
let user: User

describe('List expenses controller test', () => {
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
    listExpensesByUserServiceMock.mockClear()
  })

  it('should be able to list all expenses by user', async () => {
    const expense: Expense[] = [
      {
        id: v4(),
        description: 'Viagem',
        amount: 1000,
        user_id: user.id,
        date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    listExpensesByUserServiceMock.prototype.execute.mockResolvedValueOnce(
      expense,
    )

    const { status, body } = await request(app)
      .get(`/expenses`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(201)
    expect(body).toHaveLength(1)
    expect(
      listExpensesByUserServiceMock.prototype.execute,
    ).toHaveBeenCalledTimes(1)
  })
})
