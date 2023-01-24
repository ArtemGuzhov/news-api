import { NestFactory } from '@nestjs/core'
import { environment } from 'environment'
import { Logardian } from 'logardian'
import { AppModule } from './app.module'

const logger = new Logardian()

async function bootstrap() {
    const {
        app: { host, port },
    } = environment

    logger.configure({})

    const app = await NestFactory.create(AppModule, { logger })

    await app.listen(port, host, () => logger.log(`Server running at http://${host}:${port}`))
}
bootstrap()
