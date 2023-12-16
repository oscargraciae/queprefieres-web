import { initTRPC, TRPCError } from '@trpc/server'
import superjson from "superjson"
// import { Context } from './contex';
import { type Context } from "./contex";

// const t = initTRPC.create()
// const t = initTRPC.context<Context>().create();
const t = initTRPC.context<Context>().create();

/**
 * Reusable middleware to ensure
 * users are logged in
 */
// const isAuthed = t.middleware(({ ctx, next }) => {
//   if (!ctx.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next({
//     ctx: {
//       // infers the `session` as non-nullable
//       session: { ...ctx.user, user: ctx.user },
//     },
//   });
// });


export const router = t.router
export const procedure = t.procedure //.use(isAuthed)