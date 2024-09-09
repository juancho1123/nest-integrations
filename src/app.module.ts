import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { TwilioModule } from './providers/twilio/twilio.module';
import { EmailModule } from './providers/email/email.module';
import { CognitoService } from './providers/cognito/cognito.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TwilioModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, CognitoService],
})
export class AppModule {}
