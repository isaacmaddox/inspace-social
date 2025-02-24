"use server";

import { omit } from "@/_actions/util";
import { User } from "@prisma/client";
import { userDao } from "@/daos";
import { getSession } from "./auth";

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

export async function checkIfFollowing(userId: number) {
   const user = await getSession();
   if (!user) return false;

   const following = await userDao.checkIfFollowing(user.id, userId);

   return !!following;
}

export async function followUser(userId: number) {
   const user = await getSession();
   if (!user) return;

   await userDao.followUser(user.id, userId);
}

export async function unfollowUser(userId: number) {
   const user = await getSession();
   if (!user) return;

   await userDao.unfollowUser(user.id, userId);
}
