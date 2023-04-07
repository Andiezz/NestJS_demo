import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys: ["Grace's Secret"]
  // }))
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true //? ensure incoming req don't have extraneous property
  //     //? security
  //   })
  // )
  await app.listen(3000);
}
bootstrap();
