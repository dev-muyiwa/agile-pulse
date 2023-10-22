import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordDto } from './dto/password.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  async validatePassword(passwordDto: PasswordDto): Promise<boolean> {
    return await bcrypt.compare(
      `${passwordDto.password}${passwordDto.salt}`,
      passwordDto.hash,
    );
  }
}
