import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): any {
    const server = super.createIOServer(port, {});
    // @ts-ignore
    const redisAdapter = redisIoAdapter({
        host: 'ec2-34-221-176-89.us-west-2.compute.amazonaws.com',
        port: 6380,
    });
    server.adapter(redisAdapter);
    return server;
  }
}
