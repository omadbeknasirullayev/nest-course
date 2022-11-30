import { ApiProperty } from '@nestjs/swagger'
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import {User} from 'src/users/users.model'
import { UserRoles } from './user-roles'
interface RoleCreationAttrs {
    value: string
    description: string
}


@Table({tableName: 'roles'})

export class Role extends Model <User, RoleCreationAttrs> {

    @ApiProperty({example: '1', description: 'Role ID'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'USER', description: 'Role turi'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    value: string

    @ApiProperty({example: 'Foydalanuvchi', description: 'Role description'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string

    @BelongsToMany (() => User, () => UserRoles)
    users: User[]
}