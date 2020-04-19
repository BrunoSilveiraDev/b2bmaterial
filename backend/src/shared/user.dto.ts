import { Profile } from "./profile";
import { Document } from "mongoose";

export class User extends Document {
    _id: string;
    name: string;
    password: string;
    email: string;
    profile: Profile
}