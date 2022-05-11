import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

import { Chain } from './chain.entity';

import { ChainsService } from './chains.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { GetChainsFilterDto } from './dto/get-chains-filter.dto';
import { updateChainDto } from './dto/update-chain.dto';
import { Logger } from '@nestjs/common';
import { filter } from 'rxjs';
@Controller('chains')
@UseGuards(AuthGuard())
export class ChainsController {
  private logger = new Logger('ChainsController');

  constructor(private chainsService: ChainsService) {}

  @Get()
  getChains(
    @Query() filterDto: GetChainsFilterDto,
    @GetUser() user: User,
  ): Promise<Chain[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.chainsService.getAllChains(filterDto, user);
  }

  @Get('/:id')
  getChainbyId(@Param('id') id: string, @GetUser() user: User): Promise<Chain> {
    return this.chainsService.getChainById(id, user);
  }

  @Post()
  createChain(
    @Body() createChainDto: CreateChainDto,
    @GetUser() user: User,
  ): Promise<Chain> {
    this.logger.verbose(` User "${user.username}" creating a new chain. Data: ${JSON.stringify(createChainDto)} `)
    return this.chainsService.createChain(createChainDto, user);
  }
  @Patch()
  updateChain(
    @Query() UpdateChainDto: updateChainDto,
    @GetUser() user: User,
  ): Promise<Chain> {
    this.logger.verbose(` User "${user.username}" updating a chain. Data: ${JSON.stringify(UpdateChainDto)} `)

    return this.chainsService.updateChain(UpdateChainDto, user);
  }

  @Delete('/:id')
  deleteChain(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.chainsService.deleteChain(id, user);
  }
}
