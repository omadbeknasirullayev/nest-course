import { ApiProperty } from "@nestjs/swagger";

export class ActivateUserDto {
    @ApiProperty({example: "2", description: "User ID"})
    readonly user_id: number
}