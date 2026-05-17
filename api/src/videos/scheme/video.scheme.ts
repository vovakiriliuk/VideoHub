import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  genre!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  year!: number;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  url!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner!: User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
