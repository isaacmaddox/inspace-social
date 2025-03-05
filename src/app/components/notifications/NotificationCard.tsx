import { NotificationWithRelations } from "@/daos/notification.dao";
import { At, Heart } from "../icons";
import MarkdownContainer from "../app/MarkdownContainer";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const notificationTypeMap = {
   LIKE: <Heart />,
   COMMENT: "comment",
   FOLLOW: "follow",
   MENTION: <At />,
};

export default function NotificationCard({ notification }: { notification: NotificationWithRelations }) {
   const router = useRouter();

   const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         if (notification.link) {
            e.preventDefault();
            e.stopPropagation();
            router.push(notification.link);
         }
      },
      [router, notification.link]
   );

   return (
      <div
         className={`notification-card ${notification.type.toLowerCase()} ${notification.post ? "has-link" : ""} ${
            notification.read ? "read" : "unread"
         }`}
         onClick={handleClick}>
         <div className="notification-type-icon">{notificationTypeMap[notification.type]}</div>
         <p className="text-normal">{notification.message}</p>
         {notification.post && (
            <MarkdownContainer className="post-content text-muted text-sm no-margin">
               {notification.post.content.replaceAll(/\n\r/g, "")}
            </MarkdownContainer>
         )}
      </div>
   );
}
