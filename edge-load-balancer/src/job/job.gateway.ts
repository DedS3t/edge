import { WebSocketServer, WebSocketGateway, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Job, JobDocument } from './schema/job.schema';
import { Node, NodeDocument } from '../node/schema/node.schema';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { NodeService } from '../node/node.service';
import { NodeReadyDto } from '../node/dto/node-ready.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { JoinJobDto } from './dto/join-job.dto';
import { JobFinishedDto } from './dto/job-finished.dto';

@WebSocketGateway()
export class JobGateway {
  constructor (
    private readonly jobService: JobService,
    private readonly nodeService: NodeService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('create-job')
  public async createJob(@ConnectedSocket() client: Socket, @MessageBody() createJobDto: CreateJobDto) {
    let decoded = jwt.verify(createJobDto.jwt.split(' ')[1], jwtConstants.secret);
    // @ts-ignore
    let user_id = decoded.user_id;
    let job: JobDocument = await this.jobService.create(user_id, createJobDto);
    let nodes: NodeDocument[] = await this.nodeService.sample(createJobDto.nodes * 3);
    for (let node of nodes) {
      if (node.mem_avail >= createJobDto.mem && node.cpu_avail >= createJobDto.cpu) {
        // are you ready ? ping with a job
        this.server.to(node.host_port).emit('node-ping', job.uuid);
      }
      await new Promise(r => setTimeout(r, 0));
    }
    // TODO: error handling
    client.emit('job-created'); // requester already generated it
  }

  // start up the jobs
  @SubscribeMessage('node-ready') // - for the job
  public async nodeReady(@ConnectedSocket() client: Socket, @MessageBody() nodeReadyDto: NodeReadyDto) {
    let decoded = jwt.verify(nodeReadyDto.jwt.split(' ')[1], jwtConstants.secret);
    // @ts-ignore
    let user_id = decoded.user_id;
    if (nodeReadyDto.job_uuid == 'none') {
      await this.nodeService.setStateByHostPort(nodeReadyDto.host + ':' + nodeReadyDto.port, 'ready');
    } else {
      if (await this.jobService.nodeReady(user_id, nodeReadyDto)) {
        // generate a new key
        client.emit('node-start', { ftp_key: 'DIS IS DA KEY4FTP' });
        this.server.to(nodeReadyDto.job_uuid).emit('node-ready', { ftp_key: 'DIS IS DA KEY4FTP', host: nodeReadyDto.host, port: nodeReadyDto.port });
      }
    }
  }

  @SubscribeMessage('job-finished')
  public async jobFinished(@ConnectedSocket() client: Socket, @MessageBody() jobFinishedDto: JobFinishedDto) {
    let decoded = jwt.verify(jobFinishedDto.jwt.split(' ')[1], jwtConstants.secret);
    // @ts-ignore
    let user_id = decoded.user_id;
    // simple forward for now, billing comes later
    this.server.to(jobFinishedDto.job_uuid).emit('job-finished', { output: jobFinishedDto.output });
  }

  @SubscribeMessage('join-job')
  public async joinJob(@ConnectedSocket() client: Socket, @MessageBody() joinJobDto: JoinJobDto) {
    client.join(joinJobDto.job_uuid);
  }
}
