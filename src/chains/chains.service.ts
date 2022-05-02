import { CacheOptionsFactory, Injectable } from '@nestjs/common';
import { Chain, chainStatus } from './chain.model';
import { CreateChainDto } from './dto/create-chain.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ChainsService {
  private chains: Chain[] = [];

  getAllChains(): Chain[] {
    return this.chains;
  }

  createTask(createChainDto: CreateChainDto): Chain {
    const { title, description, period } = createChainDto;
    const chain: Chain = {
      id: uuid(),
      title,
      description,
      period,
      status: chainStatus.ON_GOING,
    };
    this.chains.push(chain);
    return chain;
  }
}
