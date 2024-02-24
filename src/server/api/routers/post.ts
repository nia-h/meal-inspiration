import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~post.create called");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ctx.db.post.create({
      data: {
        name: input.name,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  // create: protectedProcedure
  //   .input(z.object({ title: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.topic.create({
  //       data: {
  //         title: input.title,
  //         userId: ctx.session.user.id,
  //       },
  //     });
  //   }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
