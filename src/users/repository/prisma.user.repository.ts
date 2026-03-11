import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../domain/dto/create-user.dto'
import { User } from '../domain/user.entity'
import { UserMapper } from '../mappers/user.mapper'
import { PrismaService } from '../../database/prisma.service'
import { UserRepository } from './user.repository'
import { UpdateUserDto } from '../domain/dto/update-user.dto'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({ data })
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit

    const [prismaUsers, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit }),
      this.prisma.user.count(),
    ])

    const users = prismaUsers.map((user) => UserMapper.toDomain(user))
    return { users, total }
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } })
    return prismaUser ? UserMapper.toDomain(prismaUser) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } })
    return prismaUser ? UserMapper.toDomain(prismaUser) : null
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }
}
