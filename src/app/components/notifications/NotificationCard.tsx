"use client";

import MarkdownContainer from "../app/MarkdownContainer";
import "@/_css/_components/notification.css";
import { NotificationWithRelations } from "@/daos/notification.dao";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

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

   return (
      <div className={`notification ${notification.link ? "has-link" : ""}`} onClick={handleClick}>
         <p className="text-sm text-muted">{notification.type}</p>
         <MarkdownContainer className="text-base no-margin text-color-body">{notification.message}</MarkdownContainer>
         {notification.post && <MarkdownContainer className="text-sm text-muted">{notification.post.content}</MarkdownContainer>}
      </div>
   );
}
