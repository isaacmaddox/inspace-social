"use server";

import { notificationDao } from "@/daos";
import { getSession } from "./auth";
import { NotificationType } from "@prisma/client";

export async function getAllNotifications({ page, limit }: GetNotificationsParams) {
   const user = await getSession();
   if (!user) return [];
   return notificationDao.getNotifications({ recipientId: user.id, page, limit });
}

export async function getMentionsNotifications({ page, limit }: GetNotificationsParams) {
   const user = await getSession();
   if (!user) return [];
   return notificationDao.getNotifications({ recipientId: user.id, page, limit, type: NotificationType.MENTION });
}

export async function markNotificationsAsRead(ids: number[]) {
   const user = await getSession();
   if (!user) return;
   await notificationDao.markNotificationsAsRead({ recipientId: user.id, ids });
}

export type CreateNotificationParams = {
   recipientHandle: string;
   type: NotificationType;
   message: string;
   link?: string;
   actorId?: number;
   postId?: number;
}

type GetNotificationsParams = {
   page: number;
   limit: number;
};
