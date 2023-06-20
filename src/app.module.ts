import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogFileController } from './log-file/logfileController';

@Module({
  imports: [],
  controllers: [AppController, LogFileController],
  providers: [AppService],
})
export class AppModule {}
