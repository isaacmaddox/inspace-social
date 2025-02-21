"use server";

import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(): Promise<Session | null> {
   const cookieStore = await cookies();
   const session = cookieStore.get("session");

   if (!session) {
      return null;
   }

   try {
      const decoded = verify(session.value, process.env.JWT_SECRET!) as Session;

      return decoded;
   } catch {
      redirect("/logout");
   }
}

export type Session = Pick<User, "id" | "email">;
