"use client";

import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "../AuthProvider";
import "@/_css/_components/post-feed.css";

const POST_LIMIT = 10;

export default function PostFeed({ loadPostsFn }: PostFeedProps) {
   const { user } = useUser();
   const [posts, setPosts] = useState<Post[]>([]);
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

         loadPostsFn({ userId: user?.id, page, limit: POST_LIMIT }).then((posts) => {
            console.log(posts);
            setPosts((prev) => [...prev, ...posts]);
            setLoading(false);
            setHasMore(posts.length > POST_LIMIT - 1);
         });
      }
   }, [inView, user, loading, hasMore, page, loadPostsFn]);

   return (
      <div className="post-feed">
         {posts.map((post) => (
            <div key={post.id} style={{ height: "200px" }}>
               <p>{post.content}</p>
            </div>
         ))}
         <div ref={ref} />
         {loading && <div className="feed-loading-container">{loading && <p className="text-sm text-muted">Loading...</p>}</div>}
         {!hasMore && (
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
      </div>
   );
}

interface PostFeedProps {
   loadPostsFn: ({ userId, page, limit }: { userId?: number; page: number; limit: number }) => Promise<Post[]>;
}
