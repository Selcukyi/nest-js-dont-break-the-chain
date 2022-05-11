import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChainsController } from './chains.controller';
import { ChainsRepository } from './chains.repository';
import { ChainsService } from './chains.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChainsRepository]), AuthModule],
  controllers: [ChainsController],
  providers: [ChainsService],
})
export class ChainsModule {}
