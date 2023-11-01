import {
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Auth } from '../../auth/entities/auth.entity';

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  lastName!: string;

  @Unique
  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  email!: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  hasVerified: boolean;

  @HasOne(() => Auth, {
    onDelete: 'CASCADE',
    foreignKey: 'userId',
  })
  auth: Auth;
}
