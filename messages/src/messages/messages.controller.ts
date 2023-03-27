import { Controller, Get, Post, Body, Param, NotFoundException  } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  // Service is creating its own dependencies
  //! DON'T DO THIS 
  //? USE DEPENDENCY INJECTION
  constructor() {
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) { //? class transformer
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
