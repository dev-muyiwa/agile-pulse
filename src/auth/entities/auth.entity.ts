import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'authentication', updatedAt: false })
export class Auth extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  salt!: string;

  @BelongsTo(() => User, 'userId')
  user: User;
}
