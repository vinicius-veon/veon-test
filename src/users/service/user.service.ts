import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repository/user.repository'
import { CreateUserDto } from '../domain/dto/create-user.dto'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { UserMapper } from '../mappers/user.mapper'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.findByEmail(data.email)
    if (emailAlreadyExists) throw new Error(`Already exists an user with this email: ${data.email}`)
    this.userRepository.create(data)
  }

  async findAll() {
    const users = await this.userRepository.findAll()
    return users.map((user) => UserMapper.toResponseDto(user))
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error(`User not found with id: ${id}`)
    return UserMapper.toResponseDto(user)
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error(`User not found with email: ${email}`)
    return UserMapper.toResponseDto(user)
  }

  async update(id: string, user: UpdateUserDto) {
    this.userRepository.update(id, user)
  }

  async delete(id: string) {
    this.userRepository.delete(id)
  }
}
