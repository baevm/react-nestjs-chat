import { HttpStatus } from '@nestjs/common'

export class ResponseDto {
  status: HttpStatus
  message: string
}
