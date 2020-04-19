import { Controller, Post, Response, Body, HttpStatus } from "@nestjs/common";
import { UserRepository } from "src/user/repository/user.repository";
import { AuthService } from "../auth.service";
import { UserLogin } from "src/dtos/userLogin.dto";
import { User } from "src/shared/user.dto";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserRepository) {}


    @Post("login")
    async loginUser(@Response() res: any, @Body() body: UserLogin) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: "Username and password are required!" });
        }

        const user = await this.userService.findByEmail(body.email);

        if (user) {
            if (await this.userService.compareHash(body.password, user.password)) {
                return res.status(HttpStatus.OK).json(await this.authService.createToken(user.id, user));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: "Username or password wrong!" });
    }

    @Post("register")
    async registerUser(@Response() res: any, @Body() body: User) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: "Username and password are required!" });
        }

        let user = await this.userService.findByEmail(body.email);

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: "Username exists" });
        } else {
            user = await this.userService.create(body);
        }

        return res.status(HttpStatus.OK).json(user);
    }
}
