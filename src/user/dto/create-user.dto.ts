import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(20)
  @MinLength(4)
  name: string

  @ApiProperty()
  @MaxLength(50)
  @MinLength(6)
  password: string

  @ApiProperty()
  type: number
}
