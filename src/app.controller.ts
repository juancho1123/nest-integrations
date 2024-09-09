import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TwilioService } from './providers/twilio/twilio.service';
import { EmailService } from './providers/email/email.service';
import {
  ConfirmSignUpCommandOutput,
  InitiateAuthCommandOutput,
  SignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly twilioService: TwilioService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
  ): Promise<SignUpCommandOutput> {
    return this.appService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<InitiateAuthCommandOutput> {
    return this.appService.login(body);
  }

  @Post('confirm-signup')
  async confirmSignUp(
    @Body() body: { email: string; code: string },
  ): Promise<ConfirmSignUpCommandOutput> {
    return this.appService.confirmSignUp(body);
  }

  @Post('resend-confirmation-code')
  async resendConfirmationCode(@Body() body: { email: string }): Promise<void> {
    return this.appService.resendConfirmationCode(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }): Promise<void> {
    return this.appService.forgotPassword(body);
  }

  @Post('confirm-forgot-password')
  async confirmForgotPassword(
    @Body() body: { email: string; code: string; password: string },
  ): Promise<void> {
    return this.appService.confirmForgotPassword(body);
  }
}
