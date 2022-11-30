import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'Foydalanuvchi user yoki adminligi',
  })
  @IsString({ message: "Value satr bo'lishi kerak" })
  readonly value: string;

  @ApiProperty({ example: '3', description: 'Foydalanuvchining id raqami' })
  @IsNumber({}, { message: "user_id butun son bo'lishi kerak" })
  readonly user_id: number;
}
