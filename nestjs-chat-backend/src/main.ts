import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const port = process.env.PORT || 5000
const fe_origin =
  process.env.NODE_ENV === 'production' ? 'https://react-nestjs-chat.up.railway.app' : 'http://localhost:3000'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  /*  app.useGlobalGuards(new AtGuard()) */

  app.use(cookieParser())

  console.log(fe_origin)

  app.enableCors({
    credentials: true,
    origin: fe_origin,
  })

  await app.listen(port)
}
bootstrap()
