"use client";

import { getTrendingPosts } from "@/_actions/post";
import { getFollowingPosts } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { TabSelector } from "@/app/components/app/TabSelector";
import { useState } from "react";

export default function AuthenticatedFeed() {
   const [tab, setTab] = useState("following");

   return (
      <>
         <nav>
            <TabSelector
               onChangeFn={setTab}
               options={[
                  {
                     label: "Following",
                     value: "following",
                  },
                  {
                     label: "Trending",
                     value: "trending",
                  },
               ]}
            />
         </nav>
         {tab === "following" && <PostFeed feedKey="following" loadPostsFn={getFollowingPosts} />}
         {tab === "trending" && <PostFeed feedKey="trending" loadPostsFn={getTrendingPosts} />}
      </>
   );
}
