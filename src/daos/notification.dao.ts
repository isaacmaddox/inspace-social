import { NotificationType, PrismaClient } from "@prisma/client";

export class NotificationDAO {
   constructor(private readonly prisma: PrismaClient) {}

   async createNotification({ recipientHandle, type, message, link, actorId, postId }: CreateNotificationParams) {
      return this.prisma.notification.create({
         data: {
            recipient: { connect: { handle: recipientHandle } },
            type,
            message,
            link,
            actor: { connect: { id: actorId } },
            post: postId ? { connect: { id: postId } } : undefined,
         },
      });
   }

   async getNotifications({ recipientId, limit = 10, page = 1 }: GetNotificationsParams) {
      return this.prisma.notification.findMany({
         where: { recipientId },
         skip: (page - 1) * limit,
         take: limit,
         orderBy: { createdAt: "desc" },
         include: {
            actor: {
               select: {
                  id: true,
                  handle: true,
                  displayName: true,
               },
            },
            post: true,
         },
      });
   }
}

export type CreateNotificationParams = {
   recipientHandle: string;
   type: NotificationType;
   message: string;
   link?: string;
   actorId?: number;
   postId?: number;
};

type GetNotificationsParams = {
   recipientId: number;
   limit?: number;
   page?: number;
};

export type NotificationWithRelations = Awaited<ReturnType<NotificationDAO["getNotifications"]>>[number];
