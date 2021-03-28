import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodeGateway } from './node.gateway';
import { PingNodeDto } from './dto/ping-node.dto';
export declare class NodeController {
    readonly nodeService: NodeService;
    readonly nodeGateway: NodeGateway;
    constructor(nodeService: NodeService, nodeGateway: NodeGateway);
    create(req: any, createNodeDto: CreateNodeDto): Promise<import("./schema/node.schema").NodeDocument>;
    ping(pingNodeDto: PingNodeDto): Promise<void>;
}
