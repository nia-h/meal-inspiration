import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getIdeas: publicProcedure.input(z.set(z.string())).query(({ ctx, input }) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~input", input);
    const ingredsArr = Array.from(input);
    console.log("ingredsArr==>", ingredsArr);
    return ctx.db.recipe.findMany({
      take: 2,
      where: {
        Ingredients: {
          contains: ingredsArr[0],
        },
      },
    });
  }),

  //   create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~recipe.create called");
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.recipe.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  //   getLatest: protectedProcedure.query(({ ctx }) => {
  //     return ctx.db.recipe.findFirst({
  //       orderBy: { createdAt: "desc" },
  //       where: { createdBy: { id: ctx.session.user.id } },
  //     });
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
