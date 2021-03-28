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
exports.NodeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const node_service_1 = require("./node.service");
const create_node_dto_1 = require("./dto/create-node.dto");
const jwt = require("jsonwebtoken");
const constants_1 = require("../auth/constants");
const join_node_dto_1 = require("./dto/join-node.dto");
const node_busy_dto_1 = require("./dto/node-busy.dto");
let NodeGateway = class NodeGateway {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async createNode(client, createNodeDto) {
        let decoded = jwt.verify(createNodeDto.jwt.split(' ')[1], constants_1.jwtConstants.secret);
        let user_id = decoded.user_id;
        let result = await this.nodeService.create(user_id, createNodeDto);
    }
    async joinRoom(client, joinNodeDto) {
        client.join(joinNodeDto.host_port);
    }
    async nodeBusy(nodeBusyDto) {
        await this.nodeService.setStateByHostPort(nodeBusyDto.host + ':' + nodeBusyDto.port, 'busy');
    }
    async pingNode(pingNodeDto) {
        this.server.to(pingNodeDto.host_port).emit('node-ping', 'none');
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], NodeGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('create-node'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_node_dto_1.CreateNodeDto]),
    __metadata("design:returntype", Promise)
], NodeGateway.prototype, "createNode", null);
__decorate([
    websockets_1.SubscribeMessage('join-node'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, join_node_dto_1.JoinNodeDto]),
    __metadata("design:returntype", Promise)
], NodeGateway.prototype, "joinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('node-busy'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [node_busy_dto_1.NodeBusyDto]),
    __metadata("design:returntype", Promise)
], NodeGateway.prototype, "nodeBusy", null);
NodeGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], NodeGateway);
exports.NodeGateway = NodeGateway;
//# sourceMappingURL=node.gateway.js.map