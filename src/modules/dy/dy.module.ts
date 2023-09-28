import { Module } from '@nestjs/common';
import { DyController } from './dy.controller';
import { DyService } from './dy.service';

@Module({
  controllers: [DyController],
  providers: [DyService],
  exports: [DyService],
})
export class DyModule {}
