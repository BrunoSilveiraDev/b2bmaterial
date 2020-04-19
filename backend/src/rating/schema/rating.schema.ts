import * as mongoose from "mongoose";

export const RatingSchema = new mongoose.Schema(
    {
        userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileSchema", required: true },
        companyProfile: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileSchema", required: true},
        stars: { type: Number, required: true}
    },
    { collection: "rating" },
);
