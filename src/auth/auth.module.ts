import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Auth]), UserService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
