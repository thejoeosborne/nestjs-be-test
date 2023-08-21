import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export const USERS_COLLECTION = 'users';

@Schema({
  collection: USERS_COLLECTION,
  timestamps: true,
})
export class User {
  @ApiResponseProperty()
  _id: Types.ObjectId;

  @ApiProperty({
    description: `User's birthdate`,
    example: new Date().toISOString(),
    required: true,
    type: Date,
  })
  @Prop({
    type: Date,
    required: [true, 'Birthdate is required'],
  })
  birthDate: Date;

  @ApiResponseProperty()
  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @ApiProperty({
    description: `User's email address`,
    example: 'johnsmith@nestjs.com',
    required: false,
    type: String,
  })
  @Prop({
    required: [true, 'Email address is required'],
    index: true,
    type: String,
    validate: {
      validator: (v: string) => {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  })
  email: string;

  @ApiProperty({
    description: `User's first name`,
    example: 'John',
    required: true,
    type: String,
  })
  @Prop({ required: [true, 'First name is required'], type: String })
  firstName: string;

  @ApiResponseProperty()
  @Prop({ type: Boolean, default: null })
  isDeleted: boolean;

  @ApiProperty({
    description: `User's last name`,
    example: 'Smith',
    required: true,
    type: String,
  })
  @Prop({ required: [true, 'Last name is required'], type: String })
  lastName: string;

  @ApiProperty({
    description: 'Marketing source of the user',
    example: 'Google Ads',
    required: false,
    type: String,
  })
  @Prop({ required: false, type: String })
  marketingSource: string;

  @ApiProperty({
    description: 'Users phone number',
    example: '555-555-5555',
    required: true,
    type: String,
  })
  @Prop({
    required: [true, 'Phone number is required'],
    index: true,
    validate: {
      validator: (v: string) => {
        //could write more complex regex to handle other formats but this works for now
        return /[\d\-\(\)\s]+/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
    type: String,
  })
  phone: string;

  //added an age prop to the UserSchema
  @ApiProperty({
    description: `User's age`,
    example: 21,
    required: false,
    type: Number,
  })
  @Prop({ required: false, type: Number, validate: Number.isInteger })
  age: number;

  @ApiProperty({
    description: `User's status`,
    example: 'DQL',
    required: false,
  })
  @Prop({ required: false, type: String })
  status: string;

  @ApiResponseProperty()
  @Prop({ type: Date })
  updatedAt: Date;

  constructor(args?: Partial<User>) {
    Object.assign(this, args);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
