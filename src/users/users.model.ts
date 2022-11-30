import { ApiProperty } from '@nestjs/swagger'
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles'

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({tableName: 'users'})

export class User extends Model <User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unikal ID'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'User1', description: 'Foydalanuvchi ismi'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @ApiProperty({example: 'user@gmail.com', description: 'Foydalanuvchi elektron pochtasi'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @ApiProperty({example: '12345', description: 'Foydalanuvchi paroli'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @ApiProperty({example: 'true', description: 'Foydalanuvchi activ yoki yoqligi'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @BelongsToMany (() => Role, () => UserRoles)
    roles: Role[]
}