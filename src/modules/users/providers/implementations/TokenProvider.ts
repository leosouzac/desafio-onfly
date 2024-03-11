import { sign, verify } from 'jsonwebtoken'
import { ITokenProvider } from '../models/ITokenProvider'

interface IPayload {
  sub: string
  email: string
}

export class TokenProvider implements ITokenProvider {
  generationToken(secret: string, user_id: string, expires_in: string): string {
    const token = sign({}, secret, {
      subject: user_id,
      expiresIn: expires_in,
    })

    return token
  }

  verifyToken(refresh_token: string, secret_refresh_token: string): IPayload {
    const { email, sub } = verify(
      refresh_token,
      secret_refresh_token,
    ) as IPayload

    return { email, sub }
  }
}
