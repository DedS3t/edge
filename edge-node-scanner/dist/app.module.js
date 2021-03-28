"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_service_1 = require("./app.service");
const user_schema_1 = require("./user/schema/user.schema");
const node_schema_1 = require("./node/schema/node.schema");
const job_schema_1 = require("./job/schema/job.schema");
const node_module_1 = require("./node/node.module");
const node_service_1 = require("./node/node.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:ykFY9tkPJ1IpQ1X4@edge.v6nab.mongodb.net/Edge?retryWrites=true&w=majority'),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Node', schema: node_schema_1.NodeSchema },
                { name: 'Job', schema: job_schema_1.JobSchema },
            ]),
            node_module_1.NodeModule,
            common_1.HttpModule,
        ],
        providers: [
            app_service_1.AppService,
            node_service_1.NodeService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map