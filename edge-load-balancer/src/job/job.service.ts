import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Job, JobDocument } from './schema/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../user/schema/user.schema';
import { Node } from '../node/schema/node.schema';
import { NodeReadyDto } from '../node/dto/node-ready.dto';

@Injectable()
export class JobService {
  constructor (
    @InjectModel('Job') private readonly jobModel: mongoose.Model<JobDocument>,
  ) {}

  async create(user_id: User | mongoose.Schema.Types.ObjectId | string, createJobDto: CreateJobDto) {
    let createdJob: JobDocument = new this.jobModel({
      requester: user_id,
      uuid: createJobDto.uuid,
      node_cap: createJobDto.nodes,
    });
    return createdJob.save();
  }

  async nodeReady(user_id: User | mongoose.Schema.Types.ObjectId | string, nodeReadyDto: NodeReadyDto) {
    // TODO: validate node
    let result = await this.pushNodeByUuid(nodeReadyDto.job_uuid, nodeReadyDto.host + ':' + nodeReadyDto.port.toString());
    return result.nodes.length <= result.node_cap;
  }

  async pushNodeByUuid(uuid: string, node: string) {
    return this.jobModel.findOneAndUpdate({ uuid: uuid }, { $push: { nodes: node } }, { new: true });
  }
}
