import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });
  const config = new DocumentBuilder()
    .setTitle('Mi Api post-venta documentation')
    .setDescription('post-venta  API documentation')
    .setVersion('1.0')
    .addTag('despachos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  const configService = app.get(ConfigService);
  
  //server port
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log('listening on port '+ await app.getUrl())
}
bootstrap();
 