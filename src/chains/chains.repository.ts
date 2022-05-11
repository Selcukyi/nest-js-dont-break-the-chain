import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Console } from 'console';
import { filter } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { chainStatus } from './chain-status.enum';
import { Chain } from './chain.entity';
import { CreateChainDto } from './dto/create-chain.dto';
import { GetChainsFilterDto } from './dto/get-chains-filter.dto';
import { updateChainDto } from './dto/update-chain.dto';

@EntityRepository(Chain)
export class ChainsRepository extends Repository<Chain> {
  private logger = new Logger('ChainsRepository');
  async getAllChainsWithFilters(
    filterDto: GetChainsFilterDto,
    user: User,
  ): Promise<Chain[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('chain');
    query.where({ user });

    if (status) {
      query.andWhere('chain.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(chain.title) LIKE LOWER(:search) OR LOWER(chain.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const chains = await query.getMany();
      //console.log(chains);
      return chains;
    } catch (error) {
      this.logger.error(
        `Failed to get chains for user" ${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}  `,
      );
      throw new InternalServerErrorException();
    }
  }

  async getChainbyId(id: string, user: User): Promise<Chain> {
    const found = await this.findOne({ where: { id, user } });
    if (!found) {
      this.logger.error(
        `Failed to get chains for user" ${user.username}". Chain with ID "${id}" not found`,
      );
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createChain(
    createChainDto: CreateChainDto,
    user: User,
  ): Promise<Chain> {
    const { title, description, period } = createChainDto;
    const chain = this.create({
      title,
      description,
      period,
      status: chainStatus.ON_GOING,
      user,
    });
    try {
      await this.save(chain);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return chain;
  }

  async deleteChain(id: string, user: User): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateChain(
    updateChainDTO: updateChainDto,
    user: User,
  ): Promise<Chain> {
    const { id, title, description, period, status } = updateChainDTO;
    const chain = await this.findOne({ where: { id, user } });
    if (title) {
      (await chain).title = title;
    }
    if (description) {
      (await chain).description = description;
    }
    if (period) {
      (await chain).period = period;
    }
    if (status) {
      (await chain).status = status;
    }

    await this.save(chain);

    return chain;
  }
}
