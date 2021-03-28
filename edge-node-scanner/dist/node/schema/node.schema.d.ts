import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
export declare type NodeDocument = Node & mongoose.Document;
export declare class Node {
    owner: User;
    host: string;
    port: number;
    state: string;
    last_state_update: Date;
    host_port: string;
    mem_avail: number;
    cpu_avail: number;
}
export declare const NodeSchema: mongoose.Schema<mongoose.Document<Node>, mongoose.Model<mongoose.Document<Node>>, undefined>;
