import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../repository/user.repository'
import { CreateUserDto } from '../domain/dto/create-user.dto'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { UserMapper } from '../mappers/user.mapper'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PaginatedResult } from '../../common/types/pagineted-result'
import { UserResponseDto } from '../domain/dto/user-response.dto'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    const userWithEmail = await this.userRepository.findByEmail(data.email)
    if (userWithEmail) throw new BadRequestException(`Already exists an user with this email: ${data.email}`)
    await this.userRepository.create(data)
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<UserResponseDto>> {
    const { page, limit } = query
    const { users, total } = await this.userRepository.findAll(page, limit)

    return {
      data: users.map((user) => UserMapper.toResponseDto(user)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException(`User not found with id: ${id}`)
    return UserMapper.toResponseDto(user)
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new NotFoundException(`User not found with email: ${email}`)
    return UserMapper.toResponseDto(user)
  }

  async update(id: string, user: UpdateUserDto) {
    await this.assertUserExists(id)
    await this.userRepository.update(id, user)
  }

  async delete(id: string) {
    await this.assertUserExists(id)
    await this.userRepository.delete(id)
  }

  private async assertUserExists(id: string) {
    const userAlreadyExists = await this.userRepository.findById(id)
    if (!userAlreadyExists) throw new NotFoundException(`User not found with id: ${id}`)
  }
}
