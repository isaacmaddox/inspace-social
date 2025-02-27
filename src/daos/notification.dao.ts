import { NotificationType, PrismaClient } from "@prisma/client";

export class NotificationDAO {
   constructor(private readonly prisma: PrismaClient) {}

   async getNotifications({ recipientId, type, limit = 10, page = 1 }: GetNotificationsParams) {
      const notifications = await this.prisma.notification.findMany({
         where: { recipientId, type },
         orderBy: { createdAt: "desc" },
         skip: (page - 1) * limit,
         take: limit,
      });

      return notifications;
   }
}

export type CreateNotificationParams<T extends { recipientHandle?: string; recipientId?: number }> = {
   recipientHandle?: T["recipientHandle"];
   recipientId?: T["recipientId"];
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
   type?: NotificationType;
};

export type NotificationWithRelations = Awaited<ReturnType<NotificationDAO["getNotifications"]>>[number];
