import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordDto } from './dto/password.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  async getLoginCredentials(email: string) {
    const authCredentials: Auth | null = await this.authModel.findOne({
      where: { email: email },
    });

    if (!authCredentials) {
      throw new NotFoundException('Invalid login credentials');
    }

    return authCredentials;
  }

  async validatePassword(passwordDto: PasswordDto): Promise<boolean> {
    return await bcrypt.compare(
      `${passwordDto.password}${passwordDto.salt}`,
      passwordDto.hash,
    );
  }

  async hashPassword(password: string, rounds: number = 10) {
    const salt: string = await bcrypt.genSalt(rounds);
    const hash: string = await bcrypt.hash(`${password}`, salt);

    const passwordDto = new PasswordDto();
    passwordDto.password = password;
    passwordDto.salt = salt;
    passwordDto.hash = hash;

    return passwordDto;
  }

  async create(userId: string, passwordDto: PasswordDto, token: string) {
    return this.authModel.create({
      userId: userId,
      hash: passwordDto.hash,
      salt: passwordDto.salt,
      token: token,
    });
  }

  // Generate token
}
