// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { LogFileController } from './log-file/logfileController';

// @Module({
//   imports: [],
//   controllers: [AppController, LogFileController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module, MiddlewareConsumer } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthMiddleware } from "./middleware/middleware.auth"
import { AuthModule } from "./auth/auth.module"
@Module({
imports: [
AuthModule,
],
controllers: [AppController, LogFileController],
providers: [AppService],
})
export class AppModule {
configure(consumer: MiddlewareConsumer) {
consumer.apply(AuthMiddleware).forRoutes("");
}
}