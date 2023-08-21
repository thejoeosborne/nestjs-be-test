import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { diskStorage } from 'multer';
import { ParseMongoObjectIdPipe } from 'src/pipes/parse-mongo-object-id.pipe';
import { CsvParser } from 'src/providers/csv-parser.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadUsersResponseDto } from './dto/upload-users-response.dto';
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
  async postUsers(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }

  @Get('/')
  @ApiOperation({ summary: `Return a list of users` })
  @ApiOkResponse({ type: [PaginatedResponseDto] })
  async getUsers(
    @Query() query: QueryUserDto,
  ): Promise<PaginatedResponseDto<User>> {
    return await this.usersService.getAllUsers(query);
  }

  @Patch('/:id')
  @ApiOperation({ summary: `Update a single user` })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: User })
  async patchUser(
    @Param('id', ParseMongoObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: `Soft delete a single user` })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: User })
  async deleteUser(
    @Param('id', ParseMongoObjectIdPipe) id: Types.ObjectId,
  ): Promise<User> {
    return await this.usersService.softDeleteUser(id);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      // Allow only CSV mimetypes
      fileFilter: (req, file, callback) => {
        if (!file.mimetype?.match(/text\/csv/i)) {
          return callback(null, false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadUsers(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<UploadUsersResponseDto> {
    if (!file) {
      throw new UnprocessableEntityException(
        'Uploaded file is not a CSV file.',
      );
    }

    const users = await CsvParser.parse(file.path);
    const startingCount = users?.length;
    if (!startingCount) {
      throw new UnprocessableEntityException(
        'Uploaded file does not contain any users.',
      );
    }
    const returnedUsers = await this.usersService.bulkInsertUsersFromCSV(users);
    const successCount = returnedUsers?.length;
    const failedCount = startingCount - successCount;

    return new UploadUsersResponseDto({
      failedCount: failedCount,
      successCount: successCount,
    });
  }
}
