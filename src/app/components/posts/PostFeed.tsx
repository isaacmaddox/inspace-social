"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "@/_css/_components/post-feed.css";
import { FeedPost } from "@/daos/post.dao";
import Post from "./Post";

const POST_LIMIT = 5;

interface LocalStoragePost {
   posts: FeedPost[];
   page: number;
   hasMore: boolean;
}

function getLocalStorageData(key: string): LocalStoragePost | undefined {
   const data = localStorage.getItem(key);
   return data ? JSON.parse(data) : undefined;
}

function setLocalStorageData(key: string, data: LocalStoragePost) {
   localStorage.setItem(key, JSON.stringify(data));
}

export default function PostFeed({ loadPostsFn, simpleEnd = false, feedKey, isComments = false }: PostFeedProps) {
   const [posts, setPosts] = useState<FeedPost[]>([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const { ref, inView } = useInView();

   function resetFeed() {
      window.location.reload();
   }

   function updateState({ posts, page, hasMore }: { posts: FeedPost[]; page: number; hasMore: boolean }) {
      setPosts(posts);
      setPage(page);
      setHasMore(hasMore);
   }

   useEffect(() => {
      const localStorageData = getLocalStorageData(feedKey);
      const shouldLoadLocalStorage = posts.length === 0 && localStorageData && localStorageData.posts.length > 0;
      const shouldLoadMore = inView && hasMore;

      if (shouldLoadLocalStorage) {
         updateState({
            ...localStorageData,
            posts: localStorageData.posts.map((post) => ({ ...post, createdAt: new Date(post.createdAt), updatedAt: new Date(post.updatedAt) })),
         });
      } else if (shouldLoadMore) {
         if (!isComments) localStorage.clear();
         setLoading(true);
         loadPostsFn({ page, limit: POST_LIMIT }).then((newPosts) => {
            updateState({
               posts: [...posts, ...newPosts],
               page: page + 1,
               hasMore: newPosts.length > POST_LIMIT - 1,
            });
            setLoading(false);
            setLocalStorageData(feedKey, { posts: [...posts, ...newPosts], page: page + 1, hasMore: newPosts.length > POST_LIMIT - 1 });
         });
      }
   }, [inView, hasMore, loading, loadPostsFn, feedKey, page, posts, isComments]);

   return (
      <div className="post-feed">
         {posts.map((post) => (
            <Post key={post.id} post={post} />
         ))}
         <div style={{ position: "absolute", bottom: 0, height: "1px" }} ref={ref} />
         {loading && <div className="feed-loading-container">{loading && <p className="text-sm text-muted">Loading...</p>}</div>}
         {!hasMore && !simpleEnd && (
            <div className="feed-message-container">
               <span>
                  <p className="text-bold text-color-heading">No more posts</p>
                  <p className="text-sm text-muted no-margin">Refresh your feed to see anything new</p>
               </span>
               <button onClick={resetFeed} className="btn btn-sm btn-secondary">
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
   feedKey: string;
   isComments?: boolean;
}
