import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserSchema } from './user/schema/user.schema';
import { NodeSchema } from './node/schema/node.schema';
import { JobSchema } from './job/schema/job.schema';
import { NodeModule } from './node/node.module';
import { NodeService } from './node/node.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:ykFY9tkPJ1IpQ1X4@edge.v6nab.mongodb.net/Edge?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Node', schema: NodeSchema },
      { name: 'Job', schema: JobSchema },
    ]),
    NodeModule,
    HttpModule,
  ],
  providers: [
    AppService,
    NodeService,
  ],
})
export class AppModule {}
