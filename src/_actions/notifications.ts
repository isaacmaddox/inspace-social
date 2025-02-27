"use server";

import { notificationDao, userDao } from "@/daos";
import { getSession } from "./auth";
import { NotificationWithRelations } from "@/daos/notification.dao";
import { NotificationType } from "@prisma/client";

export async function getNotifications({ page, limit }: { page: number; limit: number }): Promise<NotificationWithRelations[]> {
   const session = await getSession();

   if (!session) return [];

   const notifs = await notificationDao.getNotifications({ recipientId: session.id, page, limit });

   return notifs;
}

export async function sendMentionNotifications(mentions: string[], postId: number, userId: number) {
   const user = await userDao.getUserById(userId);

   if (!user) return;

   for (const mention of mentions) {
      if (mention === user.handle) continue;

      await notificationDao.createNotification({
         recipientHandle: mention,
         type: NotificationType.MENTION,
         message: `${user.displayName} mentioned you in a post`,
         link: `${process.env.NEXT_PUBLIC_APP_URL}/user/${user.handle}/post/${postId}`,
         actorId: user.id,
         postId,
      });
   }
}