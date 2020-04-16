import { Controller, Get, Query, Put, Param, Body, Delete, Post, BadRequestException } from "@nestjs/common";
import { InterestListRepository } from "../repository/interest-list.repository";
import { InterestList } from "src/shared/interest-list";
import { ApiBody } from "@nestjs/swagger";
import { Profile } from "src/shared/profile";

@Controller("interest-list")
export class InterestListsController {
    constructor(private profileRepository: InterestListRepository) {}
    @Get("/:profileId")
    async findById(@Param("profileId") profileId): Promise<InterestList> {
        if (!profileId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException("Id Inválido!");
        }
        // TODO: o profile vem do usuario logado ou um usuario pode ver a lista de outro
        return this.profileRepository.find(profileId);
    }

    @Put("/:profileId")
    @ApiBody({ type: InterestList })
    async update(@Param("profileId") profileId: string, @Body() changes: Partial<InterestList>): Promise<InterestList> {
        return this.profileRepository.update(profileId, changes);
    }

    @Post("/:profileId")
    @ApiBody({ type: Profile })
    async addToList(@Param("profileId") profileId: string, @Body() profile: Profile): Promise<InterestList> {
        return this.profileRepository.addToList(profileId, profile);
    }

    @Delete("/:profileId")
    @ApiBody({ type: Profile })
    async removeFromList(@Param("profileId") profileId: string, @Body() profile: Profile): Promise<InterestList> {
        return this.profileRepository.removeFromList(profileId, profile);
    }
}
