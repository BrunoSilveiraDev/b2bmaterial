import { Controller, Get, Query, Put, Param, Body, Delete, Post, BadRequestException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "src/shared/user.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller("users")
export class UserController {
    constructor(private userRepository: UserRepository) {}
    @Get()
    async search(@Query("query") searchText): Promise<User[]> {
        return this.userRepository.findAllByText(searchText);
    }

    @Post()
    @ApiBody({type: User})
    async create(@Body() user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    @Put("/:userId")
    async update(@Param("userId") profileId: string, @Body() changes: Partial<User>): Promise<User> {
        if (changes._id) {
            throw new BadRequestException("A propriedade id não deve ser enviada");
        }
        return this.userRepository.update(profileId, changes);
    }

    @Delete("/:userId")
    async delete(@Param("userId") profileId: string) {
        return this.userRepository.delete(profileId);
    }
}
