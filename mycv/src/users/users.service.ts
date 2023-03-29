import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  //? @InjectRepository(User) for the usage of generics
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password })

    return this.repo.save(user);
  }

  findOne(id: number) {
    const user = this.repo.findOneBy({ id: id});

    return user;
  }
}
