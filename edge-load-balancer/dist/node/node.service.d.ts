import * as mongoose from 'mongoose';
import { Node, NodeDocument } from './schema/node.schema';
import { CreateNodeDto } from './dto/create-node.dto';
import { User } from '../user/schema/user.schema';
export declare class NodeService {
    private readonly nodeModel;
    constructor(nodeModel: mongoose.Model<NodeDocument>);
    create(user_id: User | mongoose.Schema.Types.ObjectId | string, createNodeDto: CreateNodeDto): Promise<NodeDocument>;
    findById(id: Node | mongoose.Schema.Types.ObjectId | string): Promise<NodeDocument>;
    findByHostPort(host_port: string): Promise<NodeDocument>;
    setAvailById(id: Node | mongoose.Schema.Types.ObjectId | string, avail: any): Promise<NodeDocument>;
    setStateByHostPort(host_port: string, state: string): Promise<mongoose.UpdateWriteOpResult>;
    sample(n: number): Promise<any[]>;
}
