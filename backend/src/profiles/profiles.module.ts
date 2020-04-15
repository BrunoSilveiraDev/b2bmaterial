import { Module } from "@nestjs/common";
import { ProfilesController } from "./controller/profiles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileSchema, MaterialSchema } from "./schema/profiles.schema";
import { ProfileRepository } from "./repository/profile.repository";

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
    ],
    controllers: [ProfilesController],
    providers: [ProfileRepository],
})
export class ProfilesModule {}
