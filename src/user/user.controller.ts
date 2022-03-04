import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UnauthorizedException
} from '@nestjs/common'
import { Post, Put, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { LogoutUserDto } from './dto/logout-user.dto'
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getUsers(@Query('name') name?: string): Promise<User[]> {
    const users = await this.userService.users(name)
    if (!users) throw new NotFoundException()

    return users
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.userById(id)
    if (!user) throw new NotFoundException()

    return user
  }

  @ApiOkResponse({ type: User })
  @Put('login')
  async putLogin(@Body() body: LoginUserDto): Promise<User> {
    const login = await this.userService.login(body)
    if (!login) throw new NotFoundException()

    return login
  }

  @ApiOkResponse({ type: User })
  @Post('create')
  async postCreate(@Body() body: CreateUserDto): Promise<User> {
    const create = await this.userService.create(body)
    if (!create) throw new UnauthorizedException()

    return create
  }

  @ApiOkResponse({ type: User })
  @Put('logout')
  async putLogout(@Body() body: LogoutUserDto): Promise<User> {
    const logout = await this.userService.logout(body)
    if (!logout) throw new NotFoundException()

    return logout
  }
}
