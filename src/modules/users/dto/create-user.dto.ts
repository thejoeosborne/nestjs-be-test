import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { User } from '../schema/user.schema';

export class CreateUserDto extends User {
  @ApiProperty({
    required: true,
  })
  @IsDateString()
  birthDate: Date;
}
