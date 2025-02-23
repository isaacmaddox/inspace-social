"use client";

import { getUserMentions, getUserPosts, getUserPopularPosts } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { TabSelector } from "@/app/components/app/TabSelector";
import { GetPostsParams } from "@/daos/post.dao";
import { useState } from "react";

export default function UserProfileFeed({ userId, handle }: { userId: number; handle: string }) {
   const [tab, setTab] = useState("feed");

   function userPostFn(uid: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getUserPosts({ uid, page, limit });
      };
   }

   function userMentionsFn(handle: string) {
      return ({ page, limit }: GetPostsParams) => {
         return getUserMentions({ handle, page, limit });
      };
   }

   function userPopularFn(uid: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getUserPopularPosts({ uid, page, limit });
      };
   }

   return (
      <>
         <nav>
            <TabSelector
               onChangeFn={setTab}
               options={[
                  { label: "Feed", value: "feed" },
                  { label: "Mentions", value: "mentions" },
                  { label: "Popular", value: "popular" },
               ]}
            />
         </nav>
         {tab === "feed" && <PostFeed feedKey={`profile-${userId}`} simpleEnd loadPostsFn={userPostFn(userId)} />}
         {tab === "mentions" && <PostFeed feedKey={`mentions-${userId}`} simpleEnd loadPostsFn={userMentionsFn(handle)} />}
         {tab === "popular" && <PostFeed feedKey={`popular-${userId}`} simpleEnd loadPostsFn={userPopularFn(userId)} />}
      </>
   );
}
