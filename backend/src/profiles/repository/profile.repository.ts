import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Profile } from "src/shared/profile";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./../../shared/user.dto";

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel("Profile") private profileModel: Model<Profile>) {}

    async findAllByText(searchText: string): Promise<Profile[]> {
        if (!searchText || searchText === "") {
            return [];
        }
        return this.profileModel
            .aggregate([
                { $match: { $text: { $search: `"${searchText}"` } } },
                {
                    $lookup: {
                        from: "rating",
                        localField: "_id",
                        foreignField: "companyProfile",
                        as: "ratings",
                    },
                },
                {
                    $unwind: {
                        path: "$ratings",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        isProvider: 1,
                        email: 1,
                        phone: 1,
                        name: 1,
                        cnpj: 1,
                        cidade: 1,
                        uf: 1,
                        materials: 1,
                        isProducer: 1,
                        estado: 1,
                        pais: 1,
                        cep: 1,
                        ratings: { $ifNull: ["$ratings", { stars: 0, companyProfile: "$_id" }] },
                    },
                },
                {
                    $group: {
                        _id: "$ratings.companyProfile",
                        isProvider: { $first: "$isProvider" },
                        email: { $first: "$email" },
                        phone: { $first: "$phone" },
                        name: { $first: "$name" },
                        cnpj: { $first: "$cnpj" },
                        cidade: { $first: "$cidade" },
                        uf: { $first: "$uf" },
                        materials: { $first: "$materials" },
                        isProducer: { $first: "$isProducer" },
                        estado: { $first: "$estado" },
                        pais: { $first: "$pais" },
                        cep: { $first: "$cep" },
                        starsAvg: { $avg: "$ratings.stars" },
                    },
                },
                { $sort: { score: { $meta: "textScore" } } },
            ])
            .sort({ score: { $meta: "textScore" } })
            .limit(50);
    }

    async create(model: Partial<Profile>): Promise<Profile> {
        return this.profileModel.create(model);
    }

    async update(id: string, changes: Partial<Profile>): Promise<Profile> {
        return this.profileModel.findByIdAndUpdate(id, changes, { new: true });
    }

    delete(id: string) {
        return this.profileModel.deleteOne({ _id: id });
    }
}
