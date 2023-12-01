import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService
  ) {}

  async sendVerificationEmail(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      template: './confirmation.hbs',
      subject: 'Verifica tu correo electrónico',
      context: {
        name: email,
        token,
      },
    });
  }
}
