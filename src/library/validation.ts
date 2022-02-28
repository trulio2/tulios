import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const checkUser = async (data) => {
  const user = await prisma.user.findUnique({
    where: data
  })

  return user
}
