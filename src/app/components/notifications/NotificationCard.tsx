import { NotificationWithRelations } from "@/daos/notification.dao";

export default function NotificationCard({ notification }: { notification: NotificationWithRelations }) {
   return (
      <div className="notification-card">
         <div>{notification.message}</div>
         <div>{notification.createdAt.toLocaleString()}</div>
      </div>
   );
}
