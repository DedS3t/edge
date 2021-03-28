import { WebSocketServer, WebSocketGateway, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { JoinNodeDto } from './dto/join-node.dto';
import { PingNodeDto } from './dto/ping-node.dto';
import { NodeBusyDto } from './dto/node-busy.dto';

@WebSocketGateway()
export class NodeGateway {
  constructor (
    private readonly nodeService: NodeService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('create-node')
  public async createNode(@ConnectedSocket() client: Socket, @MessageBody() createNodeDto: CreateNodeDto) {
    let decoded = jwt.verify(createNodeDto.jwt.split(' ')[1], jwtConstants.secret);
    // @ts-ignore
    let user_id = decoded.user_id;
    let result = await this.nodeService.create(user_id, createNodeDto);
    // TODO: error handling
  }

  @SubscribeMessage('join-node')
  public async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() joinNodeDto: JoinNodeDto) {
    client.join(joinNodeDto.host_port);
  }

  @SubscribeMessage('node-busy')
  public async nodeBusy(@MessageBody() nodeBusyDto: NodeBusyDto) {
    await this.nodeService.setStateByHostPort(nodeBusyDto.host + ':' + nodeBusyDto.port, 'busy');
  }

  async pingNode(pingNodeDto: PingNodeDto) {
    this.server.to(pingNodeDto.host_port).emit('node-ping', 'none');
  }
}
