import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../repository/user.repository'
import { CreateUserDto } from '../domain/dto/create-user.dto'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { UserMapper } from '../mappers/user.mapper'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.findByEmail(data.email)
    if (emailAlreadyExists) throw new BadRequestException(`Already exists an user with this email: ${data.email}`)
    await this.userRepository.create(data)
  }

  async findAll() {
    const users = await this.userRepository.findAll()
    return users.map((user) => UserMapper.toResponseDto(user))
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
    await this.verifyIfUserExists(id)
    await this.userRepository.update(id, user)
  }

  async delete(id: string) {
    await this.verifyIfUserExists(id)
    await this.userRepository.delete(id)
  }

  private async verifyIfUserExists(id: string) {
    const userAlreadyExists = await this.userRepository.findById(id)
    if (!userAlreadyExists) throw new NotFoundException(`User not found with id: ${id}`)
  }
}
