import { postRouter } from "~/server/api/routers/post";
import { recipeRouter } from "~/server/api/routers/recipe";

import { inspirationsRouter } from "~/server/api/routers/inspirations";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
