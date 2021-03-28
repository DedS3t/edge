import { Socket, Server } from 'socket.io';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { NodeService } from '../node/node.service';
import { NodeReadyDto } from '../node/dto/node-ready.dto';
import { JoinJobDto } from './dto/join-job.dto';
import { JobFinishedDto } from './dto/job-finished.dto';
export declare class JobGateway {
    private readonly jobService;
    private readonly nodeService;
    constructor(jobService: JobService, nodeService: NodeService);
    server: Server;
    createJob(client: Socket, createJobDto: CreateJobDto): Promise<void>;
    nodeReady(client: Socket, nodeReadyDto: NodeReadyDto): Promise<void>;
    jobFinished(client: Socket, jobFinishedDto: JobFinishedDto): Promise<void>;
    joinJob(client: Socket, joinJobDto: JoinJobDto): Promise<void>;
}
