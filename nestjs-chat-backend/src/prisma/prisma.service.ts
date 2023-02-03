import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist'
import { PrismaClient } from '@prisma/client'
import { isProduction } from 'src/common/helpers/isProduction'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  // refactor finding of all models names
  async dropDatabase() {
    if (isProduction) return

    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key === 'string' && key[0] !== '_' && key[0] !== "$" && key[0] === key[0].toUpperCase()
    )
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()))
  }
}
