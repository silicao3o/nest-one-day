import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService: ConfigService<any, boolean> = app.get(ConfigService);
  //
  // const swaggerConfig = (Omit<OpenAPIObject, "paths"> = new DocumentBuilder())
  //   .setTitle('Swagger Documentation')
  //   .setDescription('Documentation')
  //   .setVersion('1.0')
  //   .build();
  //
  // const document: OpenAPIObject = SwaggerModule.createDocument(
  //   app,
  //   swaggerConfig,
  // );
  // SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8012);
}
bootstrap();
