import { Body, Controller, Post, Put } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { checkUser } from '../library/validation'

const prisma = new PrismaClient()

@Controller('user')
export class UserController {
  @Put('login')
  async login(@Body() body: any) {
    const user = await checkUser({ username: body.username })

    if (!user)
      return {
        error: 'Username or Password incorrect'
      }

    await prisma.user.update({
      where: { username: body.username },
      data: {
        logged: true
      }
    })

    return user
  }

  @Post('create')
  async createUser(@Body() body: any) {
    let user = await prisma.user.findUnique({
      where: { username: body.username }
    })
    if (user)
      return {
        error: 'Username not avaliable'
      }

    console.log('post', body)
    user = await prisma.user.create({
      data: { ...body, logged: false, type: 0 }
    })

    return user
  }

  @Put('logout')
  async logout(@Body() body: any) {
    const user = await checkUser({ id: Number(body.id) })
    if (!user)
      return {
        error: 'Use not found'
      }

    await prisma.user.update({
      where: { id: Number(body.id) },
      data: {
        logged: false
      }
    })

    return user
  }
}
