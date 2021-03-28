"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redisIoAdapter = require("socket.io-redis");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port) {
        const server = super.createIOServer(port, {});
        const redisAdapter = redisIoAdapter({
            host: 'ec2-34-221-176-89.us-west-2.compute.amazonaws.com',
            port: 6380,
        });
        server.adapter(redisAdapter);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis.adapter.js.map