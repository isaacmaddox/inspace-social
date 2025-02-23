"use server";

import { getSession } from "./session";
import { redirect } from "next/navigation";
import { userDao } from "@/daos";

export async function validateUserSession(): Promise<void> {
   const session = await getSession();

   if (!session) {
      console.log("No session found");
      return;
   }

   const user = await userDao.getUserById(session.id);

   if (!user) {
      console.log("No user found");
      redirect("/logout");
   }
}
