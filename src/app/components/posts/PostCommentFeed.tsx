"use client";

import { getComments } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { GetPostsParams } from "@/daos/post.dao";

export default function PostCommentFeed({ postId, handle }: { postId: number; handle: string }) {
   function getCommentsFn(postId: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getComments({ postId, page, limit });
      };
   }

   return <PostFeed feedKey={`user-${handle}-post-${postId}`} simpleEnd loadPostsFn={getCommentsFn(Number(postId))} isComments />;
}
