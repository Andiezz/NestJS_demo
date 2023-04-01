import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//? Decorator just to extract the currentUser from session, req
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //? EC: incoming request (work with WebSocket,...)
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
