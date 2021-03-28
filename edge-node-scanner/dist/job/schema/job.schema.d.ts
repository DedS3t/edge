import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
export declare type JobDocument = Job & mongoose.Document;
export declare class Job {
    requester: User;
    uuid: string;
    nodes: string[];
    node_cap: number;
}
export declare const JobSchema: mongoose.Schema<mongoose.Document<Job>, mongoose.Model<mongoose.Document<Job>>, undefined>;
