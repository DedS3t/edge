import { HttpService } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Node, NodeDocument } from './schema/node.schema';
export declare class NodeService {
    private readonly nodeModel;
    private readonly httpService;
    constructor(nodeModel: mongoose.Model<NodeDocument>, httpService: HttpService);
    scanNodes(): Promise<void>;
    sample(n: number): Promise<any[]>;
    setStateById(id: Node | mongoose.Schema.Types.ObjectId | string, state: string): Promise<{
        ok: number;
        n: number;
        nModified: number;
    }>;
}
