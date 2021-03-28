import * as mongoose from 'mongoose';
import { JobDocument } from './schema/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../user/schema/user.schema';
import { NodeReadyDto } from '../node/dto/node-ready.dto';
export declare class JobService {
    private readonly jobModel;
    constructor(jobModel: mongoose.Model<JobDocument>);
    create(user_id: User | mongoose.Schema.Types.ObjectId | string, createJobDto: CreateJobDto): Promise<JobDocument>;
    nodeReady(user_id: User | mongoose.Schema.Types.ObjectId | string, nodeReadyDto: NodeReadyDto): Promise<boolean>;
    pushNodeByUuid(uuid: string, node: string): Promise<JobDocument>;
}
