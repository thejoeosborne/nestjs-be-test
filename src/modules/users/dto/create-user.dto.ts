import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../schema/user.schema';

export class CreateUserDto extends User {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsPhoneNumber('US')
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  marketingSource: string;

  @ApiProperty({
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsBoolean()
  updatedAt: Date;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;

  constructor(args?: Partial<CreateUserDto>) {
    super();
    Object.assign(this, args);
  }
}
