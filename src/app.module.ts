import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChainsModule } from './chains/chains.module';

@Module({
  imports: [ChainsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
