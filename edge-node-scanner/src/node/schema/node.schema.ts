import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type NodeDocument = Node & mongoose.Document;

@Schema()
export class Node {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  host: string;

  @Prop()
  port: number;

  // inferred via microservice
  @Prop({ enum: ['unknown', 'offline', 'ready', 'busy'] })
  state: string; // unknown, offline, ready, busy

  @Prop()
  last_state_update: Date;

  @Prop({ unique: true })
  host_port: string;

  // TODO: allow more memory
  @Prop()
  mem_avail: number; // kb, 2147.48 gb max

  @Prop()
  cpu_avail: number; // cpu points,

  // TODO: implement max timeout
  // @Prop()
  // max_timeout: number; // ms
}

export const NodeSchema = SchemaFactory.createForClass(Node);