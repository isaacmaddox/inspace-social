"use client";

import { getSession, Session } from "@/_actions/auth/session";
import { createContext, useContext, useEffect, useState } from "react";
const SessionContext = createContext<SessionContextType>(null);

export default function SessionProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<Session | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      async function fetchSession() {
         const session = await getSession();
         setUser(session);
         setIsLoading(false);
      }

      fetchSession();
   }, []);

   return <SessionContext.Provider value={{ user, isLoggedIn: !!user, isLoading }}>{children}</SessionContext.Provider>;
}

export function useSession() {
   const session = useContext(SessionContext);

   if (!session) {
      throw new Error("Session not found");
   }

   return session;
}

type SessionContextType = {
   user: Session | null;
   isLoggedIn: boolean;
   isLoading: boolean;
} | null;
