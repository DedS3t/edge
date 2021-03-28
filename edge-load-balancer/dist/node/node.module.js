"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const node_schema_1 = require("./schema/node.schema");
const node_controller_1 = require("./node.controller");
const node_service_1 = require("./node.service");
const node_gateway_1 = require("./node.gateway");
let NodeModule = class NodeModule {
};
NodeModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Node', schema: node_schema_1.NodeSchema },
            ])
        ],
        controllers: [
            node_controller_1.NodeController,
        ],
        providers: [
            node_service_1.NodeService,
            node_gateway_1.NodeGateway,
        ],
    })
], NodeModule);
exports.NodeModule = NodeModule;
//# sourceMappingURL=node.module.js.map