import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './service/user.service'
import { PrismaService } from '../database/prisma.service'
import { PrismaUserRepository } from './repository/prisma.user.repository'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
