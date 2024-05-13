import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './entities/participant.entity';
import { Model } from 'mongoose';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const { email, event } = createParticipantDto;

    await this.findUser(email, event);

    return await this.participantModel.create(createParticipantDto);
  }

  async findUser(email: string, eventId: string) {
    const user = await this.participantModel.findOne({
      email: email,
      event: eventId,
    });

    if (user)
      throw new UnprocessableEntityException(
        'User with this email; already registered for this event',
      );
  }

  async findParticipantsOnEvent(eventId: string) {
    return await this.participantModel.find({ event: eventId });
  }
}
