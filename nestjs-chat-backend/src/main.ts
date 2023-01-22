import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { join } from 'path'

const port = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  /*  app.useGlobalGuards(new AtGuard()) */

  /*   app.useStaticAssets(join(__dirname, '..', 'static'))
   */
  app.use(cookieParser())

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  })

  await app.listen(port)
}
bootstrap()
