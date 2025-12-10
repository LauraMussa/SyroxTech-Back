import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SyroxTech API')
    .setDescription('Documentación de la API para el e-commerce SyroxTech')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
  origin:process.env.FRONTEND_URL || '*', // ⚠️ Peligroso para prod real, pero perfecto para salir del paso HOY
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
