import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { UserRepository } from "./repository/user.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserModule {}
