"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import NotificationCard from "./NotificationCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { NotificationWithRelations } from "@/daos/notification.dao";

export default function NotificationFeed({
   getNotificationsFn,
}: {
   getNotificationsFn: ({ page, limit }: { page: number; limit: number }) => Promise<NotificationWithRelations[]>;
}) {
   const {
      data: notifications,
      fetchNextPage,
      hasNextPage,
   } = useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: async ({ pageParam }) => getNotificationsFn({ page: pageParam, limit: 10 }),
      getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
      initialPageParam: 1,
   });
   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [inView, fetchNextPage, hasNextPage]);

   return (
      <div className="notification-feed">
         {notifications?.pages.map((page) => {
            return page.map((notification) => {
               return <NotificationCard key={notification.id} notification={notification} />;
            });
         })}
         <div style={{ position: "absolute", bottom: 0, height: "1px" }} ref={ref} />
         {notifications?.pages[0].length === 0 && (
            <div className="notification-feed-empty">
               <p className="text-sm text-muted">No notifications</p>
            </div>
         )}
      </div>
   );
}
