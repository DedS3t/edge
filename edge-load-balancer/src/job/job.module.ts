import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schema/job.schema';
import { NodeSchema } from '../node/schema/node.schema';
import { UserSchema } from '../user/schema/user.schema';
import { JobService } from './job.service';
import { JobGateway } from './job.gateway';
import { NodeModule } from '../node/node.module';
import { NodeService } from '../node/node.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Job', schema: JobSchema },
      { name: 'Node', schema: NodeSchema },
    ]),
    NodeModule,
  ],
  providers: [
    JobService,
    JobGateway,
    NodeService,
  ],
})
export class JobModule {}
