import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from 'src/shared/rating.dto';
import { Profile } from 'src/shared/profile';

@Injectable()
export class RatingRepository {
    constructor(@InjectModel("Rating") private ratingModel: Model<Rating>) {}

    async create(model: Partial<Rating>): Promise<Rating> {
        return this.ratingModel.create(model);
    }

    async findByUserProfile(id: string): Promise<Rating[]> {
        let userProfile: any = {
            _id: id
        }


        return this.ratingModel
            .find({userProfile})
            .populate('companyProfile', '_id name uf cidade materials email phone isProvider isProducer', 'Profile');
    }
}
