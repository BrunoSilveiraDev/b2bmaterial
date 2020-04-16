import { Profile } from "./profile";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class InterestList extends Document {
    profile: Profile;
    @ApiProperty({
        type: [Profile],
        description: "Uma lista completa com o {_id:valor} da lista de interesse",
    })
    interestList: [Profile];
}
