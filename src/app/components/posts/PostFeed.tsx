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
   const [error, setError] = useState(false);
   const { ref, inView } = useInView();

   function resetFeed() {
      localStorage.clear();
      updateState({
         posts: [],
         page: 1,
         hasMore: true,
      });
   }

   function tryAgain() {
      setError(false);
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

      async function loadPosts() {
         if (!isComments) localStorage.clear();
         if (error) return;
         setError(false);
         setLoading(true);
         try {
            const newPosts = await loadPostsFn({ page, limit: POST_LIMIT });
            updateState({
               posts: [...posts, ...newPosts],
               page: page + 1,
               hasMore: newPosts.length > POST_LIMIT - 1,
            });
            setLoading(false);
            setLocalStorageData(feedKey, { posts: [...posts, ...newPosts], page: page + 1, hasMore: newPosts.length > POST_LIMIT - 1 });
         } catch {
            setError(true);
            setLoading(false);
         }
      }

      if (shouldLoadLocalStorage) {
         updateState({
            ...localStorageData,
            posts: localStorageData.posts.map((post) => ({ ...post, createdAt: new Date(post.createdAt), updatedAt: new Date(post.updatedAt) })),
         });
      } else if (shouldLoadMore) {
         loadPosts();
      }
   }, [inView, hasMore, loading, loadPostsFn, feedKey, page, posts, isComments, error]);

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
         {error && (
            <div className="feed-loading-container">
               <p className="text-sm text-muted">There was a problem getting new posts.</p>
               <button className="btn-sm" onClick={tryAgain}>
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
   isComments?: boolean;
}
