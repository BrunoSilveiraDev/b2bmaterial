import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Profile } from "src/shared/profile";
@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService) {}

    public notify(profileFrom: Profile, profileTo: Profile): void {
        this.sendEmail(profileFrom, profileTo);
    }

    sendEmail(profileFrom: Profile, profileTo: Profile) {
        this.mailerService
            .sendMail({
                to: `${profileTo.email}`,
                from: "b2bmaterial@gmail.com",
                subject: "B2B Material - Nova Notificação ✔",
                text: "Boas notícias! Nova ponte construída!",
                template: "new-bridge",
                context: {
                    profileFrom: { name: "Beltrano da Silva", email: "beltranosilva@teste.com" },
                    profileTo: { name: "Fulano de Tal", email: "fulanodetal@teste.com" },
                },
            })
            .then(() => {})
            .catch(() => {});
    }
}
