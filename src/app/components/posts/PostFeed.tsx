"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "@/_css/_components/post-feed.css";
import { FeedPost } from "@/daos/post.dao";
import Post from "./Post";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const POST_LIMIT = 2;

export default function PostFeed({ loadPostsFn, simpleEnd = false, feedKey, endMessage, noClick = false }: PostFeedProps) {
   const { ref, inView } = useInView();
   const {
      data: posts,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
   } = useInfiniteQuery({
      queryKey: [feedKey],
      queryFn: async ({ pageParam }) => loadPostsFn({ page: pageParam, limit: POST_LIMIT }),
      getNextPageParam: (lastPage, pages) => (lastPage.length > 0 ? pages.length + 1 : undefined),
      initialPageParam: 1,
   });
   const queryClient = useQueryClient();

   function resetFeed() {
      resetInfiniteData();
      queryClient.invalidateQueries({ queryKey: [feedKey] });
   }

   function resetInfiniteData() {
      queryClient.setQueryData([feedKey], (oldData: InfiniteData<FeedPost[]>) => {
         if (!oldData) return undefined;

         return {
            ...oldData,
            pages: oldData.pages.slice(0, 1),
            pageParams: oldData.pageParams.slice(0, 1),
         };
      });
   }

   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [inView, posts, hasNextPage, fetchNextPage]);

   return (
      <div className="post-feed">
         {posts?.pages.map((page) => page.map((post) => <Post key={post.id} post={post} noClick={noClick} />))}
         <div style={{ position: "absolute", bottom: 0, height: "1px" }} ref={ref} />
         {isLoading && <div className="feed-loading-container">{isLoading && <p className="text-sm text-muted">Loading...</p>}</div>}
         {!hasNextPage && !simpleEnd && (
            <div className="feed-message-container">
               <span>
                  <p className="text-bold text-color-heading">No more posts</p>
                  <p className="text-sm text-muted no-margin">Refresh your feed to see anything new</p>
               </span>
               <button className="btn btn-sm btn-secondary" onClick={resetFeed}>
                  Refresh
               </button>
            </div>
         )}
         {!hasNextPage && simpleEnd && (
            <div className="feed-loading-container">
               <p className="text-sm text-muted">{endMessage || "No more posts"}</p>
            </div>
         )}
         {isError && (
            <div className="feed-loading-container">
               <p className="text-sm text-muted">There was a problem getting new posts.</p>
               <button className="btn-sm" onClick={resetFeed}>
                  Try again
               </button>
            </div>
         )}
      </div>
   );
}

interface PostFeedProps {
   loadPostsFn: ({ page, limit }: { page: number; limit: number }) => Promise<FeedPost[]>;
   simpleEnd?: boolean;
   feedKey: string;
   endMessage?: string;
   noClick?: boolean;
}
