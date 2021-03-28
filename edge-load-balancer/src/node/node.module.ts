import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeSchema } from './schema/node.schema';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { NodeGateway } from './node.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Node', schema: NodeSchema },
    ])
  ],
  controllers: [
    NodeController,
  ],
  providers: [
    NodeService,
    NodeGateway,
  ],
})
export class NodeModule {}
