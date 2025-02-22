"use client";

import { FeedPost } from "@/daos/post.dao";
import MarkdownContainer from "./MarkdownContainer";
import "@/_css/_components/post.css";
import Link from "next/link";
import { useState } from "react";
import { likePost, unlikePost } from "@/_actions/post";

const numberFormatter = new Intl.NumberFormat("en-us");

export default function Post({ post: startingPost }: { post: FeedPost }) {
   const [post, setPost] = useState<FeedPost>(startingPost);
   const [liked, setLiked] = useState(post.likes?.length > 0);

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

   return (
      post && (
         <div className="post">
            <div className="post-header">
               <Link href={`/user/${post.author.handle}`} className="post-author">
                  <p className="text-normal text-color-heading no-margin">{post.author.displayName}</p>
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
