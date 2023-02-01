import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private config: ConfigService) {
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
    console.log(this.config.get('DATABASE_URL'))
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async dropDatabase() {
    if (process.env.NODE_ENV === 'production') return

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_')
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()))
  }
}
