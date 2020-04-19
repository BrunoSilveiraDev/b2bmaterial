import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/repository/user.repository";
import { User } from "src/shared/user.dto";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserRepository) { }

    async createToken(id: number, userReq: User) {
        const expiresIn = 60 * 60;
        const secretOrKey = "secret";
        const user = { id: userReq.id, name: userReq.name, email: userReq.email };
        const token = jwt.sign(user, secretOrKey, { expiresIn });

        return { expires_in: expiresIn, token };
    }

    async validateUser(signedUser: User): Promise<boolean> {
        if (signedUser && signedUser.email) {
            return Boolean(this.userService.findByEmail(signedUser.email));
        }

        return false;
    }
}
