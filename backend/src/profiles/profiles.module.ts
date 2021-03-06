import { Module } from "@nestjs/common";
import { ProfilesController } from "./controller/profiles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileSchema, MaterialSchema } from "./schema/profiles.schema";
import { ProfileRepository } from "./repository/profile.repository";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Profile",
                schema: ProfileSchema,
            },
            {
                name: "Material",
                schema: MaterialSchema,
            },
        ]),
        UserModule,
    ],
    controllers: [ProfilesController],
    providers: [ProfileRepository],
})
export class ProfilesModule {}
