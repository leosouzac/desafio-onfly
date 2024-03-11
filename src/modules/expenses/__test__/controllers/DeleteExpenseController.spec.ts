import { Expense } from '../../infra/typeorm/entities/Expense'
import { v4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { DeleteExpenseService } from '../../services/DeleteExpenseService'
import request from 'supertest'
import { User } from 'modules/users/infra/typeorm/entities/User'

jest.mock('../../../expenses/services/DeleteExpenseService')
const deleteExpenseServiceMock = DeleteExpenseService as jest.MockedClass<
  typeof DeleteExpenseService
>
let token: string
let user: User
describe('Delete expense controller test', () => {
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
    deleteExpenseServiceMock.mockClear()
  })

  it('should be able to delete a expense', async () => {
    const expense = new Expense()
    expense.id = v4()
    expense.user_id = user.id

    deleteExpenseServiceMock.prototype.execute.mockResolvedValueOnce(true)

    const { status, body } = await request(app)
      .delete(`/expenses/${expense.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(201)
    expect(body).toEqual(true)
    expect(deleteExpenseServiceMock.prototype.execute).toHaveBeenCalledTimes(1)
  })
})
