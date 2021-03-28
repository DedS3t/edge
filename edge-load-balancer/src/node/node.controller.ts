import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodeGateway } from './node.gateway';
import { PingNodeDto } from './dto/ping-node.dto';
import { Request } from 'express';

@Controller('node')
export class NodeController {
  constructor (
    readonly nodeService: NodeService,
    readonly nodeGateway: NodeGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Req() req /*: Request */, @Body() createNodeDto: CreateNodeDto) {
    return this.nodeService.create(req.user._id, createNodeDto);
  }

  // internal use only
  @Post('/ping')
  async ping(@Body() pingNodeDto: PingNodeDto) {
    return this.nodeGateway.pingNode(pingNodeDto);
  }
}
