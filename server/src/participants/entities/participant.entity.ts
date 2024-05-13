import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from 'src/events/entities/event.entity';
import { WhereHearOptions } from '../enums/enums';

@Schema({ versionKey: false, timestamps: true })
export class Participant extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true, enum: WhereHearOptions })
  whereHear: WhereHearOptions;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Event | Types.ObjectId;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
