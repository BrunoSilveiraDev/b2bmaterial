import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import * as passport from "passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(passport.authenticate("jwt", { session: false }))
<<<<<<< HEAD
            .forRoutes(
                { path: "/profiles/edit", method: RequestMethod.ALL },
            );
=======
            .forRoutes({ path: "/profile/edit", method: RequestMethod.ALL });
>>>>>>> Editar profile
    }
}
