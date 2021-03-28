import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Node, NodeDocument } from './schema/node.schema';
import { CreateNodeDto } from './dto/create-node.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class NodeService {
  constructor (
    @InjectModel('Node') private readonly nodeModel: mongoose.Model<NodeDocument>,
  ) {}

  async create(user_id: User | mongoose.Schema.Types.ObjectId | string, createNodeDto: CreateNodeDto) {
    let host_port: string = createNodeDto.host + ':' + createNodeDto.port.toString();
    let result = await this.findByHostPort(host_port);
    if (result) {
      return this.setAvailById(result._id, { mem_avail: createNodeDto.mem_avail, cpu_avail: createNodeDto.cpu_avail });
    }
    let createdNode: NodeDocument = new this.nodeModel({
      owner: user_id,
      host: createNodeDto.host,
      port: createNodeDto.port,
      state: 'unknown',
      last_state_update: new Date(),
      host_port: host_port,
      mem_avail: createNodeDto.mem_avail,
      cpu_avail: createNodeDto.cpu_avail,
    });
    return createdNode.save();
  }

  async findById(id: Node | mongoose.Schema.Types.ObjectId | string) {
    return this.nodeModel.findById(id);
  }

  async findByHostPort(host_port: string) {
    return this.nodeModel.findOne({ host_port: host_port});
  }

  async setAvailById(id: Node | mongoose.Schema.Types.ObjectId | string, avail) {
    // you can update more than one thing
    return this.nodeModel.findOneAndUpdate({ _id: id }, { mem_avail: avail.mem_avail, cpu_avail: avail.cpu_avail }, { new: true });
  }

  async setStateByHostPort(host_port: string, state: string) {
    return this.nodeModel.updateOne({ host_port: host_port }, { state: state, last_state_update: new Date() });
  }

  async sample(n: number) {
    return this.nodeModel.aggregate([{ $sample: { size: n } }]);
  }
}
