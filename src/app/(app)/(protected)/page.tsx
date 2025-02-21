"use client";

import { getFollowingPosts, getTrendingPosts } from "@/_actions/post";
import PostFeed from "@/app/components/PostFeed";
import { TabSelector } from "@/app/components/TabSelector";
import { useState } from "react";

export default function ForYouFeed() {
   const [tab, setTab] = useState("for-you");

   return (
      <main>
         <nav>
            <TabSelector
               onChangeFn={(value) => setTab(value)}
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
         {tab === "following" && <PostFeed loadPostsFn={getFollowingPosts} />}
         {tab === "trending" && <PostFeed loadPostsFn={getTrendingPosts} />}
      </main>
   );
}
