import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto) {
    return await this.eventModel.create(createEventDto);
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async findOne(id: string) {
    return await this.eventModel.findOne({ _id: id });
  }
}
