import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService, 
    public messagesService2: MessagesService, 
    public messagesService3: MessagesService) {
      // console.log(messagesService === messagesService2) // true
      // console.log(messagesService === messagesService3) // true
    } //? 3 arguments but call to only 1 instance dependency

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    //? class transformer
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessages(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      //? find all exception Nest by reveal the exception in explorer view
      throw new NotFoundException('Message not found');
    }

    return message;
  }
}
