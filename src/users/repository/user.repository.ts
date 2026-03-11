import { CreateUserDto } from '../domain/dto/create-user.dto'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { User } from '../domain/user.entity'

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<void>
  abstract findAll(page: number, limit: number): Promise<{ users: User[]; total: number }>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract update(id: string, user: UpdateUserDto): Promise<void>
  abstract delete(id: string): Promise<void>
}
