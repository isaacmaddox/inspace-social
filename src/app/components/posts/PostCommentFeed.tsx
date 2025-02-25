"use client";

import { getComments } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { GetPostsParams } from "@/daos/post.dao";
import CreateCommentForm from "./CreateCommentForm";
import { useQueryClient } from "@tanstack/react-query";

export default function PostCommentFeed({ postId, handle }: { postId: number; handle: string }) {
   const queryClient = useQueryClient();
   const feedKey = `user-${handle}-post-${postId}`;

   function getCommentsFn(postId: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getComments({ postId, page, limit });
      };
   }

   function reloadComments() {
      queryClient.invalidateQueries({ queryKey: [feedKey] });
   }

   return (
      <>
         <div className="feed-heading-container">
            <h2 className="text-lg text-bold text-color-heading">Comments</h2>
         </div>
         <CreateCommentForm parentId={Number(postId)} onCommentPosted={reloadComments} />
         <PostFeed feedKey={feedKey} simpleEnd loadPostsFn={getCommentsFn(Number(postId))} />
      </>
   );
}
