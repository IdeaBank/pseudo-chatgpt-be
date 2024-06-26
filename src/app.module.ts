import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from '@auth/auth.module';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ChatHistoryModule } from '@chat-history/chat-history.module';
import { ChatModule } from '@chat/chat.module';
import { TransformInterceptor } from '@common/response/response.interceptor';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { DatabaseModule } from '@root/database.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule, AuthModule,
    ChatHistoryModule, ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ],
})
export class AppModule { }
