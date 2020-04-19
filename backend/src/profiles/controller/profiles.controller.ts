import {
    Controller,
    Get,
    Query,
    Put,
    Param,
    Body,
    Delete,
    Post,
    BadRequestException,
    UseGuards,
    Req,
} from "@nestjs/common";
import { ProfileRepository } from "../repository/profile.repository";
import { Profile } from "src/shared/profile";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserRepository } from "src/user/repository/user.repository";
import { User } from "./../../shared/user.dto";

@ApiBearerAuth()
@Controller("profiles")
export class ProfilesController {
    constructor(private profileRepository: ProfileRepository, private readonly userService: UserRepository) {}

    @Get()
    async search(@Query("query") searchText): Promise<Profile[]> {
        return this.profileRepository.findAllByText(searchText);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() newProfile: Partial<Profile>, @Req() req): Promise<Profile> {
        return this.profileRepository.create(newProfile).then(profile => {
            this.userService.update(req.user.id, { profile });
            return profile;
        });
    }

    @Put("/:profileId")
    //@UseGuards(AuthGuard("jwt"))
    async update(
        @Param("profileId") profileId: string,
        @Body() changes: Partial<Profile>,
        @Req() req,
    ): Promise<Profile> {
        if (changes._id) {
            throw new BadRequestException("A propriedade id não deve ser enviada");
        }
        return this.profileRepository.update(profileId, changes);
    }

    @Delete("/:profileId")
    async delete(@Param("profileId") profileId: string) {
        return this.profileRepository.delete(profileId);
    }

    @Get("/user/:userId")
    async finByUserId(@Param("userId") userId: string) {
        return this.userService.findById(userId);
    }
}
