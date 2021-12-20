import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({ credentials: true });
  // app.useStaticAssets(join(__dirname, './tmp'));
  let basePath = config.get('app.basePath');
  if (!basePath) basePath = '/';
  if (basePath != '/' && basePath.charAt(0) != '/') {
    basePath = '/' + basePath + '/';
  }
  //   app.get('/', function(req, res)  {
  //     res.sendFile(path.join(__dirname, 'index.html'));
  // });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
