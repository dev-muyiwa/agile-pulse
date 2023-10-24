import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'authentication', updatedAt: false })
export class Auth extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
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
