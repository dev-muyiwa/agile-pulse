import {
  Controller,
  Post,
  Body,
  HttpCode,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { Transaction } from 'sequelize';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterUserDto) {
    const transaction: Transaction = await this.userService.startTransaction();

    try {
      let user: User = await this.userService.findOneBy(registerDto.email);
      if (user) {
        // await this.userService.rollbackTransaction(transaction);
        throw new ConflictException('Email address is already taken');
      }

      const { hash, salt } = await this.authService.hashPassword(
        registerDto.password,
      );

      const token: string = 'generate-access-token-here';

      user = await this.userService.create(registerDto);
      await Auth.create(
        {
          userId: user.id,
          email: user.email,
          hash: hash,
          salt: salt,
          token: token,
        },
        { transaction: transaction },
      );

      await transaction.commit();

      return user;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginUserDto) {
    const loginCredentials: Auth = await this.authService.getLoginCredentials(
      loginDto.email,
    );

    const isPasswordMatching: boolean = await this.authService.validatePassword(
      {
        password: loginDto.password,
        salt: loginCredentials.salt,
        hash: loginCredentials.hash,
      },
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid login credentials');
    }

    const token: string = 'access-token-here';
    // Validate token.

    return { ...loginCredentials.user, token };
  }
}
