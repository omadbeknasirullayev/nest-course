import { ApiProperty } from '@nestjs/swagger'
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript'

import { User } from 'src/users/users.model'

interface PostCreationAttrs {
    title: string
    content: string
    image: string
    user_id: number
}

@Table({tableName: 'posts'})

export class Post extends Model <Post, PostCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unikal ID'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Post1', description: 'Maqola sarlavhasi'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) 
    title: string

    @ApiProperty({example: "Bu yerda Maqola matni bo'ladi", description: 'Maqola matni'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content: string

    @ApiProperty({example: 'rasm', description: 'Maqola rasmi'})
    @Column({
        type: DataType.STRING
    })
    image: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number

    @BelongsTo (() => User)
    roles: User
}