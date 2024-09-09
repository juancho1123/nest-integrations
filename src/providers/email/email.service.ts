import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun, { MailgunMessageData, MessagesSendResult } from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class EmailService {
  mailgun: Mailgun;
  mailGunClient: IMailgunClient;

  private mailgunMessageExample: MailgunMessageData = {
    from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
    to: ['test@example.com'],
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!',
    html: '<h1>Testing some Mailgun awesomness!</h1>',
  };

  constructor(private readonly configService: ConfigService) {
    const mailgunApiKey = this.configService.get('MAILGUN_API_KEY');

    if (!mailgunApiKey) {
      throw new Error('Mailgun API key or URL not found');
    }

    this.mailgun = new Mailgun(FormData);

    this.mailGunClient = this.mailgun.client({
      username: 'api',
      key: mailgunApiKey,
    });
  }

  public async sendEmail({
    domain,
    message = this.mailgunMessageExample,
  }: {
    domain: string;
    message: MailgunMessageData;
  }): Promise<MessagesSendResult> {
    return await this.mailGunClient.messages.create(domain, message);
  }
}
