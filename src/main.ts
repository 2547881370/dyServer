import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/Interceptor/transform.interceptor';
import * as fs from 'fs';

const httpsOptions = {
  ca: fs.readFileSync('/project/dyServer/cat/ca.crt'),
  key: fs.readFileSync('/project/dyServer/cat/server.key'),
  cert: fs.readFileSync('/project/dyServer/cat/server.crt')
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('x-nest api document')
    .setDescription('nest starter project api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  // 全局过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器
  // app.useGlobalInterceptors(new TransformInterceptor());


  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content-Range',
    credentials: true,
    maxAge: 3600,
  })

  await app.listen(3000);
}
bootstrap();
