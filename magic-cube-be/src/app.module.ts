import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MagicCubeService } from './magic-cube/magic-cube.service';
import { MagicCubeController } from './magic-cube/magic-cube.controller';
import { MagicCubeModule } from './magic-cube/magic-cube.module';

@Module({
  imports: [MagicCubeModule],
  controllers: [AppController, MagicCubeController],
  providers: [AppService, MagicCubeService],
})
export class AppModule {}
