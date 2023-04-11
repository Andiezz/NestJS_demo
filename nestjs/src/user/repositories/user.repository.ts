import { BaseRepository } from "src/base.repository";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }
}