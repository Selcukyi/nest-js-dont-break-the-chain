import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { filter } from 'rxjs';
import { Chain } from './chain.model';
import { ChainsService } from './chains.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { GetChainsFilterDto } from './dto/get-chains-filter.dto';
import { updateChainDto } from './dto/update-chain.dto';

@Controller('chains')
export class ChainsController {
  constructor(private chainsService: ChainsService) {}

  @Get()
  getChains(@Query() filterDto: GetChainsFilterDto): Chain[] {
    if (Object.keys(filterDto).length) {
      return this.chainsService.getAllChainsWithFilters(filterDto);
    }
    return this.chainsService.getAllChains();
  }

  @Get('/:id')
  getChainbyId(@Param('id') id: string): Chain {
    return this.chainsService.getChainbyId(id);
  }

  @Post()
  createChain(@Body() createChainDto: CreateChainDto): Chain {
    return this.chainsService.createChain(createChainDto);
  }
  @Patch()
  updateChain(@Query() updateChainDto: updateChainDto): Chain {
    return this.chainsService.updateChain(updateChainDto);
  }

  @Delete('/:id')
  deleteChain(@Param('id') id: string): void {
    return this.chainsService.deleteChain(id);
  }
}
