"use client";

import { getComments } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { GetPostsParams } from "@/daos/post.dao";
import CreateCommentForm from "./CreateCommentForm";
import { useState } from "react";

export default function PostCommentFeed({ postId, handle }: { postId: number; handle: string }) {
   const [reset, setReset] = useState(false);

   function getCommentsFn(postId: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getComments({ postId, page, limit });
      };
   }

   function reloadComments() {
      setReset(true);
   }

   return (
      <>
         <CreateCommentForm parentId={Number(postId)} onCommentPosted={reloadComments} />
         <PostFeed feedKey={`user-${handle}-post-${postId}`} simpleEnd loadPostsFn={getCommentsFn(Number(postId))} isComments reset={reset} />
      </>
   );
}
