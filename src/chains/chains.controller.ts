import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Chain } from './chain.model';
import { ChainsService } from './chains.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { GetChainsFilterDto } from './dto/get-chains-filter.dto';

@Controller('chains')
export class ChainsController {
  constructor(private chainsService: ChainsService) {}

  @Get()
  getChains(@Query() filterDto: GetChainsFilterDto): Chain[] {
    return this.chainsService.getAllChains();
  }
  @Post()
  createChain(@Body() createChainDto: CreateChainDto): Chain {
    return this.chainsService.createTask(createChainDto);
  }
}
