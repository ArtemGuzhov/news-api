import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()

const DEFAULT_PSQL_HOST = 'localhost'
const DEFAULT_PSQL_PORT = 5432

const port = parseInt(process.env.PSQL_PORT || `${DEFAULT_PSQL_PORT}`, 10)

export default new DataSource({
    type: 'postgres',
    entities: [
        `${__dirname}/../modules/**/entities/*.entity.{js,ts}`,
        `${__dirname}/../shared/entities/*.entity.{js,ts}`,
    ],
    database: process.env.PSQL_DATABASE,
    host: process.env.PSQL_HOST || DEFAULT_PSQL_HOST,
    port,
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
})
