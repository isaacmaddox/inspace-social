"use client";

import { FeedPost } from "@/daos/post.dao";
import MarkdownContainer from "../app/MarkdownContainer";
import "@/_css/_components/post.css";
import Link from "next/link";
import { useCallback, useState } from "react";
import { likePost, unlikePost } from "@/_actions/post";
import { useRouter } from "next/navigation";

const numberFormatter = new Intl.NumberFormat("en-us");

export default function Post({ post: startingPost, noClick = false }: { post: FeedPost; noClick?: boolean }) {
   const [post, setPost] = useState<FeedPost>(startingPost);
   const [liked, setLiked] = useState(post.likes?.length > 0);
   const router = useRouter();

   const likeButtonClick = async () => {
      if (liked) {
         const updatedPost = await unlikePost({ postId: post.id });
         if (!updatedPost) return;
         setPost(updatedPost);
         setLiked(false);
      } else {
         const updatedPost = await likePost({ postId: post.id });
         // TODO: Add modal prompting user to login
         if (!updatedPost) return;
         setPost(updatedPost);
         setLiked(true);
      }
   };

   const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
         e.stopPropagation();
         if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest(".post-author"))
            return;
         router.push(`/user/${post.author.handle}/post/${post.id}`, { scroll: false });
      },
      [post.id, router, post.author.handle]
   );

   return (
      post && (
         <div className={`post ${noClick ? "no-click" : ""}`} onClick={noClick ? undefined : handleClick}>
            <div className="post-header">
               <Link href={`/user/${post.author.handle}`} className="post-author">
                  <p className="text-normal text-color-heading no-margin author-name">{post.author.displayName}</p>
                  <p className="text-sm text-muted author-handle">@{post.author.handle}</p>
               </Link>
               <p className="text-sm text-muted">
                  {post.createdAt.toLocaleTimeString("en-us", {
                     month: "2-digit",
                     day: "2-digit",
                     year: "2-digit",
                     hour: "2-digit",
                     minute: "2-digit",
                  })}
               </p>
            </div>
            <MarkdownContainer>{post.content}</MarkdownContainer>
            <div className="post-footer">
               <p className="text-sm text-muted">
                  <button className={`btn-stripped post-interaction-button ${liked ? "active" : ""}`} onClick={likeButtonClick}>
                     {numberFormatter.format(post._count.likes)} likes
                  </button>{" "}
                  &bull; <button className="btn-stripped post-interaction-button">{numberFormatter.format(post._count.comments)} comments</button>
               </p>
            </div>
         </div>
      )
   );
}
