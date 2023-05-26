import { PartialType } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class QueryUserDto extends PartialType(User) {}
