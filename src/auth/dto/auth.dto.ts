import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RegisterUserDto {
  @IsString({
    message: 'First name must be a string',
  })
  @IsNotEmpty()
  readonly firstName: string;

  @IsString({
    message: 'Last name must be a string',
  })
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be a minimum of 8 characters',
  })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  readonly password: string;
}

export class LoginUserDto extends PartialType(RegisterUserDto) {}
