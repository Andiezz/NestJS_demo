import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common'
import { UsersService } from '../users.service'
import { Observable } from 'rxjs'

//? Use Interceptor to connect to the DI System
//? Interceptor -> Decorator -> Handler
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService){}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    //? continue to run the actual route handler
    return handler.handle()
  }
}