"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const job_service_1 = require("./job.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const node_service_1 = require("../node/node.service");
const node_ready_dto_1 = require("../node/dto/node-ready.dto");
const jwt = require("jsonwebtoken");
const constants_1 = require("../auth/constants");
const join_job_dto_1 = require("./dto/join-job.dto");
const job_finished_dto_1 = require("./dto/job-finished.dto");
let JobGateway = class JobGateway {
    constructor(jobService, nodeService) {
        this.jobService = jobService;
        this.nodeService = nodeService;
    }
    async createJob(client, createJobDto) {
        let decoded = jwt.verify(createJobDto.jwt.split(' ')[1], constants_1.jwtConstants.secret);
        let user_id = decoded.user_id;
        let job = await this.jobService.create(user_id, createJobDto);
        let nodes = await this.nodeService.sample(createJobDto.nodes * 3);
        for (let node of nodes) {
            if (node.mem_avail >= createJobDto.mem && node.cpu_avail >= createJobDto.cpu) {
                this.server.to(node.host_port).emit('node-ping', job.uuid);
            }
            await new Promise(r => setTimeout(r, 0));
        }
        client.emit('job-created');
    }
    async nodeReady(client, nodeReadyDto) {
        let decoded = jwt.verify(nodeReadyDto.jwt.split(' ')[1], constants_1.jwtConstants.secret);
        let user_id = decoded.user_id;
        if (nodeReadyDto.job_uuid == 'none') {
            await this.nodeService.setStateByHostPort(nodeReadyDto.host + ':' + nodeReadyDto.port, 'ready');
        }
        else {
            if (await this.jobService.nodeReady(user_id, nodeReadyDto)) {
                client.emit('node-start', { ftp_key: 'DIS IS DA KEY4FTP' });
                this.server.to(nodeReadyDto.job_uuid).emit('node-ready', { ftp_key: 'DIS IS DA KEY4FTP', host: nodeReadyDto.host, port: nodeReadyDto.port });
            }
        }
    }
    async jobFinished(client, jobFinishedDto) {
        let decoded = jwt.verify(jobFinishedDto.jwt.split(' ')[1], constants_1.jwtConstants.secret);
        let user_id = decoded.user_id;
        this.server.to(jobFinishedDto.job_uuid).emit('job-finished', { output: jobFinishedDto.output });
    }
    async joinJob(client, joinJobDto) {
        client.join(joinJobDto.job_uuid);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], JobGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('create-job'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobGateway.prototype, "createJob", null);
__decorate([
    websockets_1.SubscribeMessage('node-ready'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_ready_dto_1.NodeReadyDto]),
    __metadata("design:returntype", Promise)
], JobGateway.prototype, "nodeReady", null);
__decorate([
    websockets_1.SubscribeMessage('job-finished'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, job_finished_dto_1.JobFinishedDto]),
    __metadata("design:returntype", Promise)
], JobGateway.prototype, "jobFinished", null);
__decorate([
    websockets_1.SubscribeMessage('join-job'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, join_job_dto_1.JoinJobDto]),
    __metadata("design:returntype", Promise)
], JobGateway.prototype, "joinJob", null);
JobGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [job_service_1.JobService,
        node_service_1.NodeService])
], JobGateway);
exports.JobGateway = JobGateway;
//# sourceMappingURL=job.gateway.js.map