import { Controller, Get, Post, Body, Query, UseGuards, Req, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createVideoDto: CreateVideoDto, @Req() req) {
    return this.videoService.create(createVideoDto, req.user);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('genre') genre?: string,
    @Query('year') year?: string,
  ) {
    return this.videoService.findAll({ 
      name, 
      genre, 
      year: year ? parseInt(year) : undefined 
    });
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyVideos(@Req() req) {
    return this.videoService.findMyVideos(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Req() req) {
    return this.videoService.delete(id, req.user);
  }
}
