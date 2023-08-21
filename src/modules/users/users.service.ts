import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { IAppConfig } from 'config/app.config';
import { IMongoConfig } from 'config/mongo.config';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<
      IAppConfig & IMongoConfig,
      true
    >,
    @InjectModel(User.name) private readonly mongooseModel: Model<User>,
  ) {}

  getModel(): Model<User> {
    return this.mongooseModel;
  }

  assembleQueryFilters(query: QueryUserDto): Record<string, any> {
    // very hacky way to allow for filtering by certain fields, but it works for now!
    const queryFilters = { isDeleted: { $in: [false, null] } };
    if (query.firstName) {
      queryFilters['firstName'] = query.firstName;
    }
    if (query.lastName) {
      queryFilters['lastName'] = query.lastName;
    }
    if (query.email) {
      queryFilters['email'] = query.email;
    }
    if (query.phone) {
      queryFilters['phone'] = query.phone;
    }
    if (query.status) {
      queryFilters['status'] = query.status;
    }
    if (query.age) {
      queryFilters['age'] = query.age;
    }
    if (query.marketingSource) {
      queryFilters['marketingSource'] = query.marketingSource;
    }
    if (query.birthDate) {
      queryFilters['birthDate'] = query.birthDate;
    }

    return queryFilters;
  }

  async getAllUsers(query: QueryUserDto): Promise<PaginatedResponseDto<User>> {
    const userModel = this.getModel();

    // very hacky way to allow for filtering by certain fields, but it works for now!
    const filters = this.assembleQueryFilters(query);

    const foundUsers = await userModel
      .find(filters)
      .sort({ [query.sortBy]: query.sort })
      .skip(query.limit * (query.page - 1))
      .limit(query.limit);
    return new PaginatedResponseDto<User>({
      data: foundUsers,
      limit: query.limit,
      page: query.page,
      sort: query.sort,
      sortBy: query.sortBy,
      //added the given filters to the PaginatedResponseDto
      filters: filters,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userModel = this.getModel();
    const createdUser = new userModel(createUserDto);
    return await createdUser.save();
  }

  async updateUser(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userModel = this.getModel();
    const filters = { _id: id, isDeleted: { $in: [false, null] } };
    const updatedUser = await userModel.findOneAndUpdate(
      filters,
      updateUserDto,
      //set new to return the new document after updating
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async softDeleteUser(id: Types.ObjectId): Promise<User> {
    const userModel = this.getModel();
    const filters = { _id: id, isDeleted: { $in: [false, null] } };
    const updatedUser = await userModel.findOneAndUpdate(
      filters,
      { isDeleted: true },
      //set new to return the new document after updating
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  //.insertMany() for a bulk insert. Set ordered to false to continue inserting documents even if one fails.
  async bulkInsertUsersFromCSV(users: User[]): Promise<User[]> {
    const userModel = this.getModel();
    return await userModel.insertMany(users, { ordered: false });
  }
}
