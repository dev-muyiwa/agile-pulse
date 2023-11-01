import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RegisterUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'password must contain at least one letter, one number, and one special character',
  })
  readonly password: string;
}

export class LoginUserDto extends PartialType(RegisterUserDto) {}
