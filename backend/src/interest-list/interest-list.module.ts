import { Module } from "@nestjs/common";
import { InterestListsController } from "./controller/interest-list.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { InterestListSchema } from "./schema/interest-list.schema";
import { InterestListRepository } from "./repository/interest-list.repository";
import { ProfileSchema } from "src/profiles/schema/profiles.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "InterestList",
                schema: InterestListSchema,
            },
            {
                name: "ProfileSchema",
                schema: ProfileSchema,
            },
        ]),
    ],
    controllers: [InterestListsController],
    providers: [InterestListRepository],
})
export class InterestListsModule {}
