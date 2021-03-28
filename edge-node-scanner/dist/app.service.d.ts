import { NodeService } from './node/node.service';
export declare class AppService {
    private readonly nodeService;
    constructor(nodeService: NodeService);
    start(): Promise<void>;
}
