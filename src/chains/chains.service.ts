import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Chain } from './chain.entity';
import { ChainsRepository } from './chains.repository';
import { CreateChainDto } from './dto/create-chain.dto';

import { GetChainsFilterDto } from './dto/get-chains-filter.dto';
import { updateChainDto } from './dto/update-chain.dto';

@Injectable()
export class ChainsService {
  constructor(
    @InjectRepository(ChainsRepository)
    private chainRepository: ChainsRepository,
  ) {}

  getAllChains(filterDto: GetChainsFilterDto, user: User): Promise<Chain[]> {
    return this.chainRepository.getAllChainsWithFilters(filterDto, user);
  }

  getChainById(id: string, user: User): Promise<Chain> {
    return this.chainRepository.getChainbyId(id, user);
  }
  createChain(createChainDto: CreateChainDto, user: User): Promise<Chain> {
    return this.chainRepository.createChain(createChainDto, user);
  }

  updateChain(UpdateChainDTO: updateChainDto, user: User): Promise<Chain> {
    return this.chainRepository.updateChain(UpdateChainDTO, user);
  }

  deleteChain(id: string, user: User): Promise<void> {
    return this.chainRepository.deleteChain(id, user);
  }
}
