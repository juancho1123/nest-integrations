import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';
import {
  MessageInstance,
  MessageListInstanceCreateOptions,
} from 'twilio/lib/rest/api/v2010/account/message';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { CallListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/call';

@Injectable()
export class TwilioService {
  client: TwilioClient;

  logger = new Logger(TwilioService.name);

  constructor(private readonly configService: ConfigService) {
    const twilioAccountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = this.configService.get('TWILIO_AUTH_TOKEN');

    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error('Twilio account SID/auth token not found');
    }

    this.client = twilio(twilioAccountSid, twilioAuthToken);
  }

  public async sendSms(
    options: MessageListInstanceCreateOptions,
  ): Promise<MessageInstance> {
    return await this.client.messages.create(options);
  }

  public async createCall(
    options: CallListInstanceCreateOptions,
  ): Promise<any> {
    return await this.client.calls.create(options);
  }
}
