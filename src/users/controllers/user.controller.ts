import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CreateUserDto } from '../domain/dto/create-user.dto'
import { UpdateUserDto } from '../domain/dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
