import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Node } from '../../node/schema/node.schema'

export type JobDocument = Job & mongoose.Document;

@Schema()
export class Job {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  requester: User;

  @Prop({ unique: true })
  uuid: string;

  // node_id is host_port for now
  @Prop()
  nodes: string[]; // only read up to index node_cap - 1

  @Prop()
  node_cap: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);