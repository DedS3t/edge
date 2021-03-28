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
const server_1 = require("../server");
let NodeService = class NodeService {
    constructor(nodeModel, httpService) {
        this.nodeModel = nodeModel;
        this.httpService = httpService;
    }
    async scanNodes() {
        let nodes = await this.sample(1000);
        let promises = [];
        for (let node of nodes) {
            if (new Date(node.last_state_update.getSeconds() + 10) < new Date()) {
                promises.push(this.setStateById(node._id, 'offline'));
            }
            promises.push(this.httpService.post(server_1.server.root + '/node/ping', { host_port: node.host_port }).toPromise());
        }
        try {
            await Promise.all(promises);
        }
        catch (error) {
            console.log(error);
        }
    }
    async sample(n) {
        return this.nodeModel.aggregate([{ $sample: { size: n } }]);
    }
    async setStateById(id, state) {
        return this.nodeModel.updateOne({ _id: id }, { state: state });
    }
};
NodeService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Node')),
    __metadata("design:paramtypes", [mongoose.Model, common_1.HttpService])
], NodeService);
exports.NodeService = NodeService;
//# sourceMappingURL=node.service.js.map