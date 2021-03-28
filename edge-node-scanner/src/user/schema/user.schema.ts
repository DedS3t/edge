import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true, maxlength: 100, unique: true })
  username: string;

  @Prop({ required: true, maxlength: 1000 })
  password: string;

  // TODO: add transactions here
}

export const UserSchema = SchemaFactory.createForClass(User);
