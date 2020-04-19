import { Document } from "mongoose";
import { Profile } from "./profile";

export class Rating extends Document {
    _id: string;
    userProfile: Profile;
    companyProfile: Profile;
    stars: number;
}