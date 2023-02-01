import { IsString, IsNotEmpty, MinLength, Length } from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Username must be longer than 3 and shorter than 30 characters' })
  readonly username: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must at least 6 characters.' })
  readonly password: string
}
