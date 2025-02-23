"use client";

import { getNewestPosts, getTrendingPosts } from "@/_actions/post";
import PostFeed from "@/app/components/posts/PostFeed";
import { TabSelector } from "@/app/components/app/TabSelector";
import { useState } from "react";

export default function UnauthenticatedFeed() {
   const [tab, setTab] = useState("following");

   return (
      <>
         <nav>
            <TabSelector
               onChangeFn={(value) => setTab(value)}
               options={[
                  {
                     label: "Trending",
                     value: "trending",
                  },
                  {
                     label: "Newest",
                     value: "newest",
                  },
               ]}
            />
         </nav>
         {tab === "trending" && <PostFeed loadPostsFn={getTrendingPosts} feedKey="trending" />}
         {tab === "newest" && <PostFeed loadPostsFn={getNewestPosts} feedKey="newest" />}
      </>
   );
}
