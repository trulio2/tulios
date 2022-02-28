import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { LogoutUserDto } from './dto/logout-user.dto'
import { checkUser } from '../library/validation'
import { User } from './entities/user.entity'

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  async users(name: string): Promise<User[]> {
    let users
    if (name) users = await prisma.user.findUnique({ where: { name: name } })
    else users = await prisma.user.findMany()

    return users
  }

  async userById(id: number): Promise<User> {
    return await prisma.user.findUnique({ where: { id: id } })
  }

  async login(body: LoginUserDto): Promise<User> {
    const user = await checkUser({ name: body.name })
    if (user)
      await prisma.user.update({
        where: { name: body.name },
        data: {
          logged: true
        }
      })

    return user
  }

  async create(createSchema: CreateUserDto): Promise<User> {
    let user = await prisma.user.findUnique({
      where: { name: createSchema.name }
    })
    if (user) return

    user = await prisma.user.create({
      data: { ...createSchema, logged: false }
    })

    return user
  }

  async logout(body: LogoutUserDto): Promise<User> {
    const user = await checkUser({ id: Number(body.id) })
    if (!user) return

    await prisma.user.update({
      where: { id: Number(body.id) },
      data: {
        logged: false
      }
    })

    return user
  }
}
