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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = exports.Job = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../user/schema/user.schema");
let Job = class Job {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Job.prototype, "requester", void 0);
__decorate([
    mongoose_1.Prop({ unique: true }),
    __metadata("design:type", String)
], Job.prototype, "uuid", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], Job.prototype, "nodes", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Job.prototype, "node_cap", void 0);
Job = __decorate([
    mongoose_1.Schema()
], Job);
exports.Job = Job;
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
//# sourceMappingURL=job.schema.js.map