"use client";

import MarkdownContainer from "../app/MarkdownContainer";
import "@/_css/_components/notification.css";
import { NotificationWithRelations } from "@/daos/notification.dao";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { NotificationType } from "@prisma/client";
import { At } from "../icons";

export default function NotificationCard({ notification }: { notification: NotificationWithRelations }) {
   const router = useRouter();

   const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.stopPropagation();
         if (e.target instanceof HTMLAnchorElement) return;
         if (notification.link) {
            router.push(notification.link);
         }
      },
      [notification.link, router]
   );

   const handleClearClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
   }, []);

   const notificationTypeContent = {
      [NotificationType.MENTION]: <At />,
      [NotificationType.LIKE]: "liked your post",
      [NotificationType.COMMENT]: "commented on your post",
      [NotificationType.FOLLOW]: "followed you",
   };

   return (
      <div className={`notification ${notification.link ? "has-link" : ""}`} onClick={handleClick}>
         <p className={`notification-type-chip ${notification.type}`}>{notificationTypeContent[notification.type]}</p>
         <MarkdownContainer className="text-normal no-margin text-color-heading notification-message">{notification.message}</MarkdownContainer>
         {notification.post && (
            <MarkdownContainer className="text-sm text-muted post-content">{notification.post.content.replaceAll(/\n\r/g, "")}</MarkdownContainer>
         )}
         <button className="notification-action-button btn-stripped" onClick={handleClearClick}>
            Clear
         </button>
      </div>
   );
}
