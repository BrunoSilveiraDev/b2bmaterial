import * as mongoose from "mongoose";
import { ProfileSchema } from "src/profiles/schema/profiles.schema";

export const InterestListSchema = new mongoose.Schema(
    {
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileSchema", unique: true },
        interestList: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProfileSchema", unique: true }],
    },
    { collection: "interestlist" },
);
