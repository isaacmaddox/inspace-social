"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "@/_css/_components/post-feed.css";
import { FeedPost } from "@/daos/post.dao";
import Post from "./Post";

const POST_LIMIT = 5;

export default function PostFeed({ loadPostsFn, simpleEnd = false }: PostFeedProps) {
   const [posts, setPosts] = useState<FeedPost[]>([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const { ref, inView } = useInView();

   function resetFeed() {
      window.location.reload();
   }

   useEffect(() => {
      if (inView && !loading && hasMore) {
         setLoading(true);
         setPage((prev) => prev + 1);

         loadPostsFn({ page, limit: POST_LIMIT }).then((posts) => {
            setPosts((prev) => [...prev, ...posts]);
            setLoading(false);
            setHasMore(posts.length > POST_LIMIT - 1);
         });
      }
   }, [inView, loading, hasMore, loadPostsFn, page]);

   return (
      <div className="post-feed">
         {posts.map((post) => (
            <Post key={post.id} post={post} />
         ))}
         <div style={{ position: "absolute", bottom: "50vh", height: "1px" }} ref={ref} />
         {loading && <div className="feed-loading-container">{loading && <p className="text-sm text-muted">Loading...</p>}</div>}
         {!hasMore && !simpleEnd && (
            <div className="feed-message-container">
               <span>
                  <p className="text-bold text-color-heading">No more posts</p>
                  <p className="text-sm text-muted">Refresh your feed to see anything new</p>
               </span>
               <button onClick={resetFeed} className="btn btn-secondary">
                  Refresh
               </button>
            </div>
         )}
         {!hasMore && simpleEnd && (
            <div className="feed-loading-container">
               <p className="text-sm text-muted">No more posts</p>
            </div>
         )}
      </div>
   );
}

interface PostFeedProps {
   loadPostsFn: ({ page, limit }: { page: number; limit: number }) => Promise<FeedPost[]>;
   simpleEnd?: boolean;
}
