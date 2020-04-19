import { Module } from "@nestjs/common";
import { RatingRepository } from "./repository/rating.repository";
import { RatingController } from "./controller/rating.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { RatingSchema } from "./schema/rating.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Rating",
                schema: RatingSchema,
            },
        ]),
    ],
    providers: [RatingRepository],
    controllers: [RatingController],
})
export class RatingModule {}
