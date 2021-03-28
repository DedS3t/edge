import { Socket, Server } from 'socket.io';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { JoinNodeDto } from './dto/join-node.dto';
import { PingNodeDto } from './dto/ping-node.dto';
import { NodeBusyDto } from './dto/node-busy.dto';
export declare class NodeGateway {
    private readonly nodeService;
    constructor(nodeService: NodeService);
    server: Server;
    createNode(client: Socket, createNodeDto: CreateNodeDto): Promise<void>;
    joinRoom(client: Socket, joinNodeDto: JoinNodeDto): Promise<void>;
    nodeBusy(nodeBusyDto: NodeBusyDto): Promise<void>;
    pingNode(pingNodeDto: PingNodeDto): Promise<void>;
}
