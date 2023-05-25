import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor() {}

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
    return;
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
