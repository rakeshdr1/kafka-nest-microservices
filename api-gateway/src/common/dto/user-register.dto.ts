import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * request DTO for user creation on `user registration` api-endipoints
 */
export class UserRegisterDto {
  /**
   * firstName for a user
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  /**
   * lastName for a user
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  /**
   * email for a user
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  /**
   * password for a user
   */
  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  password: string;

  /**
   * phone number for a user
   */
  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone: string;
}
