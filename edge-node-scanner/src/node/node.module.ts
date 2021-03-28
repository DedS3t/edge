import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { NodeSchema } from './schema/node.schema';
import { JobSchema } from '../job/schema/job.schema';
import { NodeService } from './node.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Node', schema: NodeSchema },
      { name: 'Job', schema: JobSchema },
    ]),
    HttpModule,
  ],
  providers: [
    NodeService,
  ],
})
export class NodeModule {}