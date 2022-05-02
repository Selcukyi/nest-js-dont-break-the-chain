import { CacheOptionsFactory, Injectable } from '@nestjs/common';
import { Chain, chainStatus } from './chain.model';
import { CreateChainDto } from './dto/create-chain.dto';
import { v4 as uuid } from 'uuid';
import { GetChainsFilterDto } from './dto/get-chains-filter.dto';
import { updateChainDto } from './dto/update-chain.dto';

@Injectable()
export class ChainsService {
  private chains: Chain[] = [];

  getAllChains(): Chain[] {
    return this.chains;
  }

  getAllChainsWithFilters(filterDto: GetChainsFilterDto): Chain[] {
    const { status, search } = filterDto;
    let chains = this.getAllChains();
    if (status) {
      chains = chains.filter((chain) => chain.status === status);
    }

    if (search) {
      chains = chains.filter((chain) => {
        if (
          chain.title.includes(search) ||
          chain.description.includes(search)
        ) {
          return true;
        }
        return false;
      });
      return chains;
    }
    return chains;
  }

  createChain(createChainDto: CreateChainDto): Chain {
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
  getChainbyId(id: string): Chain {
    return this.chains.find((Chain) => Chain.id === id);
  }
  deleteChain(id: string): void {
    this.chains = this.chains.filter((chain) => chain.id !== id);
  }

  updateChain(updateChainDTO: updateChainDto): Chain {
    const { id, title, description, period, status } = updateChainDTO;
    const chain = this.getChainbyId(id);
    if (title) {
      chain.title = title;
    }
    if (description) {
      chain.description = description;
    }
    if (period) {
      chain.period = period;
    }
    if (status) {
      chain.status = status;
    }

    return chain;
  }
}
