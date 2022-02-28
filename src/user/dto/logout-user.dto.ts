import { ApiProperty } from '@nestjs/swagger'

export class LogoutUserDto {
  @ApiProperty()
  id: number
}
