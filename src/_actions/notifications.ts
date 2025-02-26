"use server";

import { notificationDao } from "@/daos";
import { getSession } from "./auth";
import { NotificationWithRelations } from "@/daos/notification.dao";

export async function getNotifications({ page, limit }: { page: number; limit: number }): Promise<NotificationWithRelations[]> {
   const session = await getSession();

   console.log("session", session);

   if (!session) return [];

   const notifs = await notificationDao.getNotifications({ recipientId: session.id, page, limit });

   console.log(notifs);

   return notifs;
}
