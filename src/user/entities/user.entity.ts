import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string

  @ApiProperty()
  created: Date

  @ApiProperty()
  updated: Date

  @ApiProperty()
  logged: boolean

  @ApiProperty()
  type: number
}
