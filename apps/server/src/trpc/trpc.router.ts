import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';

import { Movie } from '@prisma/client';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    getOne: this.trpc.procedure
      .input(
        z.object({
          id: z.number(),
        }) satisfies z.Schema<Pick<Movie, 'id'>>,
      )
      .query(({ input }) => {
        const { id } = input;
        return {
          movie: `Movie ${id ? id : `Nothing`}`,
        };
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
