import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginatedResponseSortEnum } from '../interfaces/paginated-response.interface';
import { User } from '../schema/user.schema';

export class QueryUserDto extends PartialType(User) {
  @ApiProperty({
    default: 20,
    description: `Number of users to return`,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number = 20;

  @ApiProperty({
    default: 1,
    description: `Current page of users`,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    default: PaginatedResponseSortEnum.DESC,
    description: `Sort order. Desc/Newest = -1, Asc/Oldest = 1`,
    enum: PaginatedResponseSortEnum,
    required: false,
  })
  @IsEnum(PaginatedResponseSortEnum)
  @IsOptional()
  @Type(() => Number)
  sort: PaginatedResponseSortEnum = PaginatedResponseSortEnum.ASC;

  @ApiProperty({
    default: 'createdAt',
    description: `User field to sort by`,
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  //add in fields to query by - firstName, lastName, email, phone, status, age, marketingSource, birthDate
  @ApiProperty({
    description: `User's first name`,
    example: 'John',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: `User's last name`,
    example: 'Smith',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: `User's email address`,
    example: 'john@example.com',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: `User's birthdate`,
    example: new Date().toISOString(),
    required: false,
    type: Date,
  })
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    description: `User's phone number`,
    example: '123-456-7890',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: `User's age`,
    example: 21,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({
    description: `User's status`,
    example: 'active',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({
    description: `User's marketing source`,
    example: 'google',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  marketingSource: string;

  constructor(args?: Partial<QueryUserDto>) {
    super();
    Object.assign(this, args);
  }
}
