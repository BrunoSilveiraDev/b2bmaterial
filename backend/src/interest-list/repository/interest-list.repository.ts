import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { InterestList } from "src/shared/interest-list";
import { Profile } from "src/shared/profile";

@Injectable()
export class InterestListRepository {
    constructor(@InjectModel("InterestList") private interestListModel: Model<InterestList>) {}

    async find(profileFromId: any): Promise<InterestList> {
        return this.interestListModel
            .findOne({ profile: profileFromId })
            .populate("interestList", "id cnpj name cidade estado uf telefone email pais materials", "Profile");
    }

    async addToList(profileFromId: any, profile: Profile) {
        return this.interestListModel.findOneAndUpdate(
            { profile: profileFromId },
            { $addToSet: { interestList: profile } },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            },
        );
    }

    async removeFromList(profileFromId: any, profile) {
        return this.interestListModel
            .findOneAndUpdate({ profile: profileFromId }, { $pull: { interestList: profile._id } }, { new: true })
            .populate("interestList", "name", "Profile");
    }

    async update(id: any, changes: Partial<InterestList>): Promise<InterestList> {
        return this.interestListModel
            .findOneAndUpdate({ profile: id }, changes, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            })
            .populate("interestList", "name", "Profile");
    }
}
