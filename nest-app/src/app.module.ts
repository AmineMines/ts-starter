import { Module } from '@nestjs/common';

import { AppController } from './infrastructure/web/controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
