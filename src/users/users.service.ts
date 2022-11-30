import { Body, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  //==================================================================================
  // User yaratish
  //==================================================================================

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  //==================================================================================
  // Userlarni hammasini olish
  //==================================================================================

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

    //==================================================================================
  // Userni id bo'yicha olish
  //==================================================================================

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({where: {id}, include: { all: true } });
    return user;
  }

  //==================================================================================
  // Email orqali userni topib olish
  //==================================================================================

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  //==================================================================================
  // Userga role qo'shish
  //==================================================================================

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.user_id);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  //==================================================================================
  // Userni activqilish
  //==================================================================================

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.user_id);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }

//==================================================================================
// Userni o'zgartirish
//==================================================================================

  async editUser(id: number, userEdit: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id)
    console.log(user)
    if (!user) {
      return {message: "User topilmadi"}
    }

    const edit_user = await this.userRepository.update(userEdit, {where: {id: user.id}})
    console.log(edit_user) 
  }

//==================================================================================
// Userni o'chirish
//==================================================================================

  async deleteUser(id: number) {
    const deleted = await this.userRepository.destroy({where: {id}})
    if (!deleted) 
      return {message: "user topilmadi"}
    return {message: "user o'chirildi"}
  }

}