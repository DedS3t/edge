"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const redis_adapter_1 = require("./adapters/redis.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
    app.useWebSocketAdapter(new redis_adapter_1.RedisIoAdapter(app));
    await app.listen(3333);
}
bootstrap();
//# sourceMappingURL=main.js.map