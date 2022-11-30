import { ForeignKey,  Column, DataType, HasMany, Model, Table} from 'sequelize-typescript'
import {User} from 'src/users/users.model'
import { Role } from './roles.model'


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})

export class UserRoles extends Model <UserRoles> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER})
    user_id: number

    @ForeignKey (() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number

}