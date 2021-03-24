import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { nodeEnv, swaggerOptions } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  const env = config.get<string>('NODE_ENV');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('🏡 Buuk Core API')
    .setDescription('Buuk Core API')
    .setVersion('1.0.0')
    .addTag('Auth', 'Auth API Endpoints!')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  if (env !== nodeEnv.PRODUCTION) {
    SwaggerModule.setup('api/docs', app, document, swaggerOptions);
  }

  const allowedOrigins: (string | RegExp)[] = [/^https?:\/\/([a-z0-9]+[.])*buuk\.com/i];

  if (env !== nodeEnv.PRODUCTION) {
    allowedOrigins.push(/^http?:\/\/([a-z0-9]+[.])*localhost:3000/i);
    allowedOrigins.push(/^https?:\/\/([a-z0-9]+[.])*amplifyapp.com/i);
  }
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.use(compression());
  app.use(helmet());
  app.use(morgan('dev'));

  env !== nodeEnv.DEVELOPMENT && app.enable('trust proxy');

  await app.listen(port);
  console.log('The app is up on port:', port);
}
bootstrap();
