"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schema/job.schema");
const node_schema_1 = require("../node/schema/node.schema");
const job_service_1 = require("./job.service");
const job_gateway_1 = require("./job.gateway");
const node_module_1 = require("../node/node.module");
const node_service_1 = require("../node/node.service");
let JobModule = class JobModule {
};
JobModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Job', schema: job_schema_1.JobSchema },
                { name: 'Node', schema: node_schema_1.NodeSchema },
            ]),
            node_module_1.NodeModule,
        ],
        providers: [
            job_service_1.JobService,
            job_gateway_1.JobGateway,
            node_service_1.NodeService,
        ],
    })
], JobModule);
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map