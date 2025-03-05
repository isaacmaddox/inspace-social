import { NotificationType, PrismaClient } from "@prisma/client";

export class NotificationDAO {
   constructor(private readonly prisma: PrismaClient) { }

   async getNotifications({ recipientId, type, limit = 10, page = 1 }: GetNotificationsParams) {
      const notifications = await this.prisma.notification.findMany({
         where: { recipientId, type },
         orderBy: [{ read: "asc" }, { createdAt: "desc" }],
         skip: (page - 1) * limit,
         take: limit,
         include: {
            actor: {
               select: {
                  handle: true,
               },
            },
            post: {
               select: {
                  id: true,
                  content: true,
               },
            },
         },
      });

      return notifications;
   }

   async markNotificationsAsRead({ recipientId, ids }: { recipientId: number; ids: number[] }) {
      await this.prisma.notification.updateMany({
         where: {
            ...(ids.length > 0 ? { id: { in: ids } } : {}),
            recipientId,
         },
         data: { read: true },
      });
   }
}

type GetNotificationsParams = {
   recipientId: number;
   limit?: number;
   page?: number;
   type?: NotificationType;
};

export type NotificationWithRelations = Awaited<ReturnType<NotificationDAO["getNotifications"]>>[number];
