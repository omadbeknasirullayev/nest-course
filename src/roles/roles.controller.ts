import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags("Foydalanuvchilarning rollari")
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @ApiOperation({ summary: 'Role yaratish' })
    @ApiResponse({ status: 201, type: Role })
    @Post()
    create(@Body() createRoleDto: CreateRolesDto) {
        return this.roleService.createRole(createRoleDto)
    }

    @ApiOperation({ summary: 'Rolelarni olish' })
    @ApiResponse({ status: 200, type: [Role] })

    @Get()
    getAllRoles() {
        return this.roleService.getAllRoles()
    }

    @ApiOperation({ summary: "Role ni value bo'yicha olish" })
    @ApiResponse({ status: 200, type: Role })
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
