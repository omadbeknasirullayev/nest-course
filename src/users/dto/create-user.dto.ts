import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @IsString({message: "Ismi satr bo'lishi kerak"})
  readonly name: string;

  @ApiProperty({
    example: 'user23@gmail.com',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @IsString({message: "Email satr so'lishi kerak"})
  @IsEmail({}, {message: "Noto'g'ri email kiritilgan"})
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Foydalanuvchi paroli' })
  @IsString({message: "Parol satr bo'lishi kerak"})
  @MinLength(4, {message: "Parol kamida 4ta dan uzun bo'lishi kerak"})
  readonly password: string;
}
