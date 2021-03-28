import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { NodeModule } from './node/node.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:ykFY9tkPJ1IpQ1X4@edge.v6nab.mongodb.net/Edge?retryWrites=true&w=majority'),
    UserModule,
    NodeModule,
    JobModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
