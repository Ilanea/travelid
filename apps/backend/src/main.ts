/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import RedisStore from "connect-redis"
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.use(cookieParser());
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('TravelID API')
    .setDescription('The TravelID API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const redisClient = await createClient({
    url: 'redis://localhost:6379'
  });
  
  redisClient.on('error', (err) =>
    Logger.error('Could not establish a connection with redis. ' + err)
  );
  redisClient.on('connect', () =>
    Logger.log('Connected to redis successfully')
  );

  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "travelid:",
  })

  app.use(
    session({
      store: redisStore,
      resave: false, 
      saveUninitialized: false,
      secret: configService.get('SESSION_SECRET'),
      cookie: { 
        maxAge: 3600000, 
        secure: false 
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();