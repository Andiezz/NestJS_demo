import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { config } from 'process';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        //? DI
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          //? sync entity with database through TypeORM
          //! danger in production: lost data when remove a column 
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   //? TypeORM automatically make the repository
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, //? automatically update the structure of the DB table without migration (in production to change the structure of db)
    //   //! just for development
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // globally scoped pipe
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //? ensure incoming req don't have extraneous property
        //? security
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService){}

  // globally scoped middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this,this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
