import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

//? a normal Class
interface ClassConstructor {
  new (...args: any[]): {}
}

//? INTERCEPTOR run after any middleware, any guard 

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // //? Run sth before a request is handled
    // //? by the request handler
    // console.log("I'm running before the handler", context);
    return handler.handle().pipe(
      map((data: any) => {
        // // Run sth before the response is sent out
        // console.log("I'm running before the response is sent out", data)
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
