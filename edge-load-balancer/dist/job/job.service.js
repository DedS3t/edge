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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let JobService = class JobService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async create(user_id, createJobDto) {
        let createdJob = new this.jobModel({
            requester: user_id,
            uuid: createJobDto.uuid,
            node_cap: createJobDto.nodes,
        });
        return createdJob.save();
    }
    async nodeReady(user_id, nodeReadyDto) {
        let result = await this.pushNodeByUuid(nodeReadyDto.job_uuid, nodeReadyDto.host + ':' + nodeReadyDto.port.toString());
        return result.nodes.length <= result.node_cap;
    }
    async pushNodeByUuid(uuid, node) {
        return this.jobModel.findOneAndUpdate({ uuid: uuid }, { $push: { nodes: node } }, { new: true });
    }
};
JobService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Job')),
    __metadata("design:paramtypes", [mongoose.Model])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map