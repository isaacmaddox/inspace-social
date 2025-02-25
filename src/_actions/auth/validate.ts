"use server";

import { getSession } from "./session";
import { redirect } from "next/navigation";
import { userDao } from "@/daos";

export async function validateUserSession(): Promise<void> {
   const session = await getSession();

   if (!session) {
      return;
   }

   const user = await userDao.getUserById(session.id);

   if (!user) {
      redirect("/logout");
   }
}
