import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Profile } from "src/shared/profile";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel("Profile") private profileModel: Model<Profile>) {}

    async findAllByText(searchText: string): Promise<Profile[]> {
        if (!searchText || searchText === "") {
            return this.profileModel.find();
        }
        return this.profileModel
            .find({ $text: { $search: `"${searchText}"` } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } });
    }

    async create(model: Partial<Profile>): Promise<Profile> {
        return this.profileModel.create(model);
    }

    async update(id: string, changes: Partial<Profile>): Promise<Profile> {
        return this.profileModel.findOneAndUpdate({ _id: id }, changes, { new: true });
    }

    delete(id: string) {
        return this.profileModel.deleteOne({ _id: id });
    }
}
