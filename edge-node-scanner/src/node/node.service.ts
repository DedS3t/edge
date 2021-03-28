import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Node, NodeDocument } from './schema/node.schema';
import { server } from '../server';

@Injectable()
export class NodeService {
  constructor (
    @InjectModel('Node') private readonly nodeModel: mongoose.Model<NodeDocument>,
    private readonly httpService: HttpService,
  ) {}

  async scanNodes() {
    let nodes: NodeDocument[] = await this.sample(1000);
    let promises = [];
    for (let node of nodes) {
      // dual-mode hybrid system ultimate
      if (new Date(node.last_state_update.getSeconds() + 10) < new Date()) {
        // too late
        promises.push(this.setStateById(node._id, 'offline'));
      }
      promises.push(this.httpService.post(server.root + '/node/ping', { host_port: node.host_port }).toPromise());
    }
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }

  async sample(n: number) {
    return this.nodeModel.aggregate([{ $sample: { size: n } }]);
  }

  async setStateById(id: Node | mongoose.Schema.Types.ObjectId | string, state: string) {
    return this.nodeModel.updateOne({ _id: id }, { state: state });
  }
}