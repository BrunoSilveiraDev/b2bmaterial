import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { RatingRepository } from '../repository/rating.repository';
import { Rating } from 'src/shared/rating.dto';

@Controller('rating')
export class RatingController {
    constructor(private ratingRepository: RatingRepository){}
    
    @Post()
    async create(@Body() rating: Rating): Promise<Rating> {
        return this.ratingRepository.create(rating);
    }

    @Get('/:userId')
    async search(@Param("userId") userId: string): Promise<Rating[]> {
        return this.ratingRepository.findByUserProfile(userId);
    }
}
