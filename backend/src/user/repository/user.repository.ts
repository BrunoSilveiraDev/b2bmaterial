import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/shared/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {

    private saltRounds = 10;

    constructor(@InjectModel("User") private userModel: Model<User>) {}

    async findAllByText(searchText: string): Promise<User[]> {
        if (!searchText || searchText === "") {
            return this.userModel.find();
        }
        return this.userModel
            .find({ $text: { $search: `"${searchText}"` } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email})
    }

    async create(model: Partial<User>): Promise<User> {
        model.password = await this.getHash(model.password);
        return this.userModel.create(model);
    }

    async update(id: string, changes: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate({ _id: id }, changes, { new: true });
    }

    delete(id: string) {
        return this.userModel.deleteOne({ _id: id });
    }

    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }
  
    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
      return bcrypt.compare(password, hash);
    }
}
