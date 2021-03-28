import { Injectable } from '@nestjs/common';
import { NodeService } from './node/node.service';

@Injectable()
export class AppService {
  constructor (
    private readonly nodeService: NodeService,
  ) {}

  async start() {
    while (true) {
      await this.nodeService.scanNodes();
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}