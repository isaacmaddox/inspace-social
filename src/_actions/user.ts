"use server";

import { omit } from "@/_actions/util";
import { User } from "@prisma/client";
import { userDao } from "@/daos";

export default async function getUserByHandle(handle: string): Promise<Omit<User, "password" | "salt"> | null> {
   const user = await userDao.getUserByHandle(handle);

   if (!user) return null;

   return omit(user, ["password", "salt"]);
}

export async function getUserById(id: number): Promise<Omit<User, "password" | "salt"> | null> {
   const user = await userDao.getUserById(id);

   if (!user) return null;

   return omit(user, ["password", "salt"]);
}
