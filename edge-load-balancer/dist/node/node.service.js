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
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let NodeService = class NodeService {
    constructor(nodeModel) {
        this.nodeModel = nodeModel;
    }
    async create(user_id, createNodeDto) {
        let host_port = createNodeDto.host + ':' + createNodeDto.port.toString();
        let result = await this.findByHostPort(host_port);
        if (result) {
            return this.setAvailById(result._id, { mem_avail: createNodeDto.mem_avail, cpu_avail: createNodeDto.cpu_avail });
        }
        let createdNode = new this.nodeModel({
            owner: user_id,
            host: createNodeDto.host,
            port: createNodeDto.port,
            state: 'unknown',
            last_state_update: new Date(),
            host_port: host_port,
            mem_avail: createNodeDto.mem_avail,
            cpu_avail: createNodeDto.cpu_avail,
        });
        return createdNode.save();
    }
    async findById(id) {
        return this.nodeModel.findById(id);
    }
    async findByHostPort(host_port) {
        return this.nodeModel.findOne({ host_port: host_port });
    }
    async setAvailById(id, avail) {
        return this.nodeModel.findOneAndUpdate({ _id: id }, { mem_avail: avail.mem_avail, cpu_avail: avail.cpu_avail }, { new: true });
    }
    async setStateByHostPort(host_port, state) {
        return this.nodeModel.updateOne({ host_port: host_port }, { state: state, last_state_update: new Date() });
    }
    async sample(n) {
        return this.nodeModel.aggregate([{ $sample: { size: n } }]);
    }
};
NodeService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Node')),
    __metadata("design:paramtypes", [mongoose.Model])
], NodeService);
exports.NodeService = NodeService;
//# sourceMappingURL=node.service.js.map