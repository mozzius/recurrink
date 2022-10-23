// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { createClient, User } from "@supabase/supabase-js";
import { prisma } from "@recurrink/db";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey)
  throw new Error("Missing Supabase config");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  user: User | null;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    user: opts.user,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const session = await supabase.auth.getUser(
    opts.req.cookies["Authorization"]
  );
  return await createContextInner({ user: session.data.user });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
