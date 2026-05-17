import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './scheme/video.scheme';
import { CreateVideoDto } from './dto/create-video.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async create(createVideoDto: CreateVideoDto, user: User): Promise<Video> {
    const newVideo = new this.videoModel({
      ...createVideoDto,
      owner: user._id,
    });
    return newVideo.save();
  }

  async findAll(filters: { name?: string; genre?: string; year?: number }): Promise<Video[]> {
    const query: any = {};
    if (filters.name) {
      query.$or = [
        { title: { $regex: filters.name, $options: 'i' } },
        { name: { $regex: filters.name, $options: 'i' } },
        { description: { $regex: filters.name, $options: 'i' } }
      ];
    }
    if (filters.genre) {
      query.genre = filters.genre;
    }
    if (filters.year) {
      query.year = filters.year;
    }
    return this.videoModel.find(query).populate('owner', 'username').exec();
  }

  async findMyVideos(user: User): Promise<Video[]> {
    return this.videoModel.find({ owner: user._id }).populate('owner', 'username').exec();
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoModel.findById(id).populate('owner', 'username').exec();
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  async delete(id: string, user: User): Promise<any> {
    return this.videoModel.deleteOne({ _id: id, owner: user._id }).exec();
  }
}
