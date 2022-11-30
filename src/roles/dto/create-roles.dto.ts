import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUppercase } from "class-validator"

export class CreateRolesDto {
    @ApiProperty({example: "USER", description: "Foydalanuvchi USER yoki ADMIN"})
    @IsString({message: "Value string bo'lishi kerak"})
    @IsUppercase({message: "Value Katta harflarda kiritilishi kerak"})
    readonly value: string

    @ApiProperty({example: "Foydalanuvchi", description: "Valuening ta'rifi"})
    @IsString({message: "Description satr bo'lishi kerak"})
    readonly description: string
}