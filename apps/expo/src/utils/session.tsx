import type { Session as SessionType } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const Session = createContext<SessionType | null>(null);

export const SessionProvider = Session.Provider;

export const useSession = () => {
  const session = useContext(Session);

  if (!session) {
    throw new Error("No session");
  }

  return session;
};
