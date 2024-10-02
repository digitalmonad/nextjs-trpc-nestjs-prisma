import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(PORT, () =>
    console.log('Server is listening on port ', PORT),
  );
}
bootstrap();
