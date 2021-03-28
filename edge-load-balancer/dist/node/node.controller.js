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
exports.NodeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const node_service_1 = require("./node.service");
const create_node_dto_1 = require("./dto/create-node.dto");
const node_gateway_1 = require("./node.gateway");
const ping_node_dto_1 = require("./dto/ping-node.dto");
let NodeController = class NodeController {
    constructor(nodeService, nodeGateway) {
        this.nodeService = nodeService;
        this.nodeGateway = nodeGateway;
    }
    async create(req, createNodeDto) {
        return this.nodeService.create(req.user._id, createNodeDto);
    }
    async ping(pingNodeDto) {
        return this.nodeGateway.pingNode(pingNodeDto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/create'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_node_dto_1.CreateNodeDto]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "create", null);
__decorate([
    common_1.Post('/ping'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ping_node_dto_1.PingNodeDto]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "ping", null);
NodeController = __decorate([
    common_1.Controller('node'),
    __metadata("design:paramtypes", [node_service_1.NodeService,
        node_gateway_1.NodeGateway])
], NodeController);
exports.NodeController = NodeController;
//# sourceMappingURL=node.controller.js.map