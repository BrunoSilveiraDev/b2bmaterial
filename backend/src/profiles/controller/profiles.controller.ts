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

@ApiBearerAuth()
@Controller("profiles")
export class ProfilesController {
    constructor(private profileRepository: ProfileRepository) {}

    @Get()
    async search(@Query("query") searchText): Promise<Profile[]> {
        return this.profileRepository.findAllByText(searchText);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() profile: Partial<Profile>): Promise<Profile> {
        return this.profileRepository.create(profile);
    }

    @Put("/:profileId")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("profileId") profileId: string, @Body() changes: Partial<Profile>): Promise<Profile> {
        if (changes._id) {
            throw new BadRequestException("A propriedade id não deve ser enviada");
        }
        return this.profileRepository.update(profileId, changes);
    }

    @Delete("/:profileId")
    async delete(@Param("profileId") profileId: string) {
        return this.profileRepository.delete(profileId);
    }
}
