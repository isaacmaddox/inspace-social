import { useInfiniteQuery } from "@tanstack/react-query";
import NotificationCard from "./NotificationCard";
import { NotificationWithRelations } from "@/daos/notification.dao";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "@/_css/_components/notification.css";

const NOTIFICATION_LIMIT = 10;

export default function NotificationFeed({ loadNotificationsFn }: NotificationFeedProps) {
   const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam }) => loadNotificationsFn({ page: pageParam, limit: NOTIFICATION_LIMIT }),
      getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
      initialPageParam: 1,
   });
   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [inView, hasNextPage, data, fetchNextPage]);

   return (
      <div className="notification-feed">
         {data?.pages.map((page) =>
            page.map((notification) => <NotificationCard key={notification.id} notification={notification} />)
         )}
         <div style={{ position: "absolute", bottom: 0, height: "1px" }} ref={ref} />
         {isLoading && (
            <div className="feed-loading-container">
               {isLoading && <p className="text-sm text-muted">Loading...</p>}
            </div>
         )}
         {!hasNextPage && !isLoading && (
            <div className="feed-message-container">
               <p className="text-sm text-muted">No more notifications</p>
            </div>
         )}
      </div>
   );
}

interface NotificationFeedProps {
   loadNotificationsFn: ({ page, limit }: { page: number; limit: number }) => Promise<NotificationWithRelations[]>;
}
