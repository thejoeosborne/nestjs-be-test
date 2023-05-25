import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  marketingSource: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  status: string;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
