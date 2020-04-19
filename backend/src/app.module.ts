import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProfilesModule } from "./profiles/profiles.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule, HandlebarsAdapter } from "@nestjs-modules/mailer";
import { NotificationService } from "./notification/notification.service";
import { InterestListsModule } from "./interest-list/interest-list.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // upgrade later with STARTTLS
                    auth: {
                        user: configService.get("MAIL_USER"),
                        pass: configService.get("MAIL_PASS"),
                    },
                },
                defaults: {
                    from: "'nest-modules' <modules@nestjs.com>",
                },
                template: {
                    dir: "./templates",
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        ProfilesModule,
        InterestListsModule,
        AuthModule,
        UserModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get("MONGO_CONNECTION"),
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, NotificationService],
})
export class AppModule {}
