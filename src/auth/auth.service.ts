import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login-auth.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    if (!user) {
        throw new HttpException("Foydalanuvchi topilmadi", HttpStatus.NOT_FOUND)
    }
    return user
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email)
    if (condidate) {
        throw new HttpException("Bunday foydalanuvchi mavjud", HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 7)
    const user = await this.userService.createUser({
        ...userDto,
        password: hashedPassword
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {token: this.jwtService.sign(payload)}
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email)
    if (!user) {
        throw new UnauthorizedException("Email yoki Parol noto'g'ri")
    }
    const validPassword = await bcrypt.compare(loginDto.password, user.password)
    if (user && validPassword) {
        return user
    }
    throw new UnauthorizedException("Email yoki Parol noto'g'ri")
  }
}
