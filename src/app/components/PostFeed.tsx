"use client";

import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "../AuthProvider";

const POST_LIMIT = 10;

export default function PostFeed({ loadPostsFn }: PostFeedProps) {
   const { user } = useUser();
   const [posts, setPosts] = useState<Post[]>([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && !loading && user && hasMore) {
         setLoading(true);
         setPage((prev) => prev + 1);

         loadPostsFn(user!.id, page, POST_LIMIT).then((posts) => {
            setPosts((prev) => [...prev, ...posts]);
            setLoading(false);
            setHasMore(posts.length > 0);
         });
      }
   }, [inView, user]);

   return (
      <div>
         {posts.map((post) => (
            <div key={post.id} style={{ height: "200px" }}>
               <p>{post.content}</p>
            </div>
         ))}
         <div ref={ref} />
         {loading && <p className="text-sm text-muted">Loading...</p>}
         {!hasMore && <p className="text-sm text-muted">No more posts</p>}
      </div>
   );
}

interface PostFeedProps {
   loadPostsFn: (userId: number, page: number, limit: number) => Promise<Post[]>;
}
