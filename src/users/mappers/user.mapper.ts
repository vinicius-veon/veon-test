import { User as PrismaUser } from '../../generated/prisma/client'
import { UserResponseDto } from '../domain/dto/user-response.dto'
import { User } from '../domain/user.entity'

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.reconstitute({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      phone: prismaUser.phone ?? undefined,
      createdAt: prismaUser.createdAt,
    })
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? null,
      createdAt: user.createdAt,
    }
  }

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? null,
      createdAt: user.createdAt,
    }
  }
}
