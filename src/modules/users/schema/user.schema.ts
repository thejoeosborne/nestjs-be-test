import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @ApiResponseProperty()
  _id: Types.ObjectId;

  @ApiProperty({
    description: `User's birthdate`,
    example: new Date().toISOString(),
    required: true,
  })
  @Prop({ type: Date })
  birthDate: Date;

  @ApiResponseProperty()
  @Prop({ type: Date })
  createdAt: Date;

  @ApiProperty({
    description: `User's email address`,
    example: 'johnsmith@nestjs.com',
    required: true,
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: `User's first name`,
    example: 'John',
    required: true,
  })
  @Prop()
  firstName: string;

  @Prop({ type: Boolean, default: null })
  isDeleted: boolean;

  @ApiProperty({
    description: `User's last name`,
    example: 'Smith',
    required: true,
  })
  @Prop()
  lastName: string;

  @ApiProperty({ required: false })
  @Prop()
  marketingSource: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    description: `User's status`,
    example: 'DQL',
    required: false,
  })
  @Prop()
  status: string;

  @ApiResponseProperty()
  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
