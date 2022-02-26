import { Body, Controller, Post, Put } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Controller('user')
export class UserController {
  @Post('login')
  async login(@Body() body: any) {
    const user = await prisma.user.findUnique({
      where: { username: body.username }
    })

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

  @Put('update')
  updateLogin() {
    return 'login-token'
  }
}
