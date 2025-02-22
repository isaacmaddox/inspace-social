"use client";

import { getTrendingPosts, getUserPosts } from "@/_actions/post";
import PostFeed from "@/app/components/PostFeed";
import { TabSelector } from "@/app/components/TabSelector";
import { GetPostsParams } from "@/daos/post.dao";
import { useState } from "react";

export default function UserProfileFeed({ userId }: { userId: number }) {
   const [tab, setTab] = useState("feed");

   function userPostFn(uid: number) {
      return ({ page, limit }: GetPostsParams) => {
         return getUserPosts({ uid, page, limit });
      };
   }

   return (
      <>
         <TabSelector
            onChangeFn={setTab}
            options={[
               { label: "Feed", value: "feed" },
               { label: "Mentions", value: "mentions" },
            ]}
         />
         {tab === "feed" && <PostFeed simpleEnd loadPostsFn={userPostFn(userId)} />}
         {tab === "mentions" && <PostFeed simpleEnd loadPostsFn={getTrendingPosts} />}
      </>
   );
}
