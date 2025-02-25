"use client";

import { getSession } from "@/_actions/auth";
import { getUserById } from "@/_actions/user";
import { User } from "@prisma/client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContextType>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<Omit<User, "password" | "salt"> | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      getSession().then(async (session) => {
         if (!session) {
            setUser(null);
            setIsLoading(false);
            return;
         }

         const user = await getUserById(session.id);

         setUser(user);
         setIsLoading(false);
      });
   }, []);

   return <UserContext.Provider value={{ user, isLoggedIn: !!user, isLoading }}>{children}</UserContext.Provider>;
}

type UserContextType = {
   user: Omit<User, "password" | "salt"> | null;
   isLoggedIn: boolean;
   isLoading: boolean;
} | null;
