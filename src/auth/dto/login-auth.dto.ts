import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @IsString({ message: "email satr bo'lishi kerak" })
  @IsEmail({}, { message: "Noto'g'ri email kiritildi" })
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'Foydalanuvchi paroli' })
  @IsString({ message: "Parol satr bo'lishi kerak" })
  @Length(4, 200, { message: "Parol kamida 4ta belgidan uzun bo'lishi kerak" })
  readonly password: string;
}
