"use server";

import { notificationDao } from "@/daos";
import { getSession } from "./auth";

export async function getAllNotifications({ page, limit }: GetNotificationsParams) {
   const user = await getSession();
   if (!user) return [];
   return notificationDao.getNotifications({ recipientId: user.id, page, limit });
}

type GetNotificationsParams = {
   page: number;
   limit: number;
};
