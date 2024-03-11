import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: 5432,
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: 'onfly',
  logging: false,
  synchronize: false,
  // ssl: true,
  entities:
    process.env.NODE_ENV === 'prod'
      ? ['dist/modules/**/infra/typeorm/entities/*.js']
      : ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations:
    process.env.NODE_ENV === 'dev'
      ? ['dist/shared/infra/typeorm/migrations/*.js']
      : ['src/shared/infra/typeorm/migrations/*.ts'],
})
