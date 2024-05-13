import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get(':id')
  async getAllParticipants(@Param('id') id: string) {
    return await this.participantsService.findParticipantsOnEvent(id);
  }
}
