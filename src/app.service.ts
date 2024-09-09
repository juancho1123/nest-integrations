import { BadRequestException, Injectable } from '@nestjs/common';
import { CognitoService } from './providers/cognito/cognito.service';
import {
  ConfirmSignUpCommandOutput,
  InitiateAuthCommandOutput,
  SignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class AppService {
  constructor(private readonly cognitoService: CognitoService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<SignUpCommandOutput> {
    try {
      return await this.cognitoService.signUpCommand({ email, password });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<InitiateAuthCommandOutput> {
    try {
      return await this.cognitoService.signInCommand({ email, password });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async confirmSignUp({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<ConfirmSignUpCommandOutput> {
    try {
      return await this.cognitoService.confirmSignUpCommand({ email, code });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async resendConfirmationCode({ email }: { email: string }): Promise<void> {
    try {
      await this.cognitoService.resendConfirmationCodeCommand({ email });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async forgotPassword({ email }: { email: string }): Promise<void> {
    try {
      await this.cognitoService.forgotPasswordCommand({ email });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async confirmForgotPassword({
    email,
    code,
    password,
  }: {
    email: string;
    code: string;
    password: string;
  }): Promise<void> {
    try {
      await this.cognitoService.confirmForgotPasswordCommand({
        email,
        code,
        password,
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async changePassword({
    email,
    oldPassword,
    newPassword,
  }: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    try {
      await this.cognitoService.changePasswordCommand({
        email,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
