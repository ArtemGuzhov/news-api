import helmet from 'helmet'

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { environment } from 'environment'
import { Logardian } from 'logardian'
import { AppModule } from './app.module'
import { corsConfig } from './config/cors.config'

const logger = new Logardian()

async function bootstrap() {
    const {
        app: { host, port },
    } = environment

    logger.configure({})

    const app = await NestFactory.create(AppModule, { logger })

    app.use(helmet())
    app.enableVersioning({
        type: VersioningType.URI,
    })
    app.enableCors(corsConfig)
    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: false,
        }),
    )

    await app.listen(port, host, () => logger.log(`Server running at http://${host}:${port}`))
}
bootstrap()
