import * as mongoose from "mongoose";
import { ProfileSchema } from "src/profiles/schema/profiles.schema";

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileSchema" }
});
