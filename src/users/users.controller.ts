import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
// import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //==================================================================================
  // User yaratish route
  //==================================================================================

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //==================================================================================
  // Userlarni olish route
  //==================================================================================

  @ApiOperation({ summary: 'Foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, type: [User] })
  //   @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  //==================================================================================
  // Userni id bo'yicha olish route
  //==================================================================================

  @ApiOperation({ summary: "Foydalanuvchini id bo'yicha olish" })
  @ApiResponse({ status: 200, type: User })

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  
  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getOneUser(id)
  }

  //==================================================================================
  // Userga role qo'shish route
  //==================================================================================

  @ApiOperation({ summary: 'Foydalanuvchilarga role berish' })
  @ApiResponse({ status: 200, type: User })
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  //==================================================================================
  // Userni active qilish route
  //==================================================================================

  @ApiOperation({ summary: 'Foydalanuvchini faollashtirish' })
  @ApiResponse({ status: 200, type: User })
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }

  //==================================================================================
  // Userni yangilash route
  //==================================================================================

  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  editUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, updateUserDto);
  }

  //==================================================================================
  // Userni o'chirish route
  //==================================================================================

  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
