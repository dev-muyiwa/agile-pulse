import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from '../auth/dto/auth.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(userDto: RegisterUserDto) {
    return await this.userModel.create({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
    });
  }

  async findOne(id: string) {
    const user: User | null = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  async findOneBy(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email: email },
    });
  }

  async findAll() {
    return await User.findAll();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async startTransaction(): Promise<Transaction> {
    return await this.userModel.sequelize.transaction();
  }

  async commitTransaction(transaction: Transaction): Promise<void> {
    await transaction.commit();
  }

  async rollbackTransaction(transaction: Transaction): Promise<void> {
    await transaction.rollback();
  }
}
