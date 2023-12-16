import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from 'next-auth/react';

import db from "../lib/db";

export async function createContext (opts: CreateNextContextOptions) {
  const { req, res } = opts;
  const session = await getSession({ req })
  return { req, res, prisma: db, user: session?.user };
};

export type Context = inferAsyncReturnType<typeof createContext>;
