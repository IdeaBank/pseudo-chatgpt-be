import { Module } from '@nestjs/common';

import { ChatHistoryModule } from '@chat-history/chat-history.module';
import { ChatModule } from '@chat/chat.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { DatabaseModule } from '@root/database.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, ChatHistoryModule, ChatModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
