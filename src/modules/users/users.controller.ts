import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('users')
@UseInterceptors(UsersInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: `Create a new user` })
  @ApiOkResponse({ type: User })
  async postUsers(): Promise<User> {
    return;
  }

  @Get('/')
  @ApiOperation({ summary: `Return a list of users` })
  @ApiOkResponse({ type: [User] })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getModel().find();
  }

  @Patch('/:id')
  @ApiOperation({ summary: `Update a single user` })
  @ApiOkResponse({ type: User })
  async patchUser(): Promise<User> {
    return;
  }

  @Delete('/:id')
  @ApiOperation({ summary: `Soft delete a single user` })
  @ApiOkResponse({ type: User })
  async deleteUser(): Promise<User> {
    return;
  }
}
