import { MessagesRepository } from "./messages.repository";

export class MessagesService {
  messagesRepo: MessagesRepository; 

  constructor() {
    // Service is creating its own dependencies
    //! DON'T DO THIS 
    //? USE DEPENDENCY INJECTION
    this.messagesRepo = new MessagesRepository();
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}