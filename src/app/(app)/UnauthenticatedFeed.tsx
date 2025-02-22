"use client";

import { getNewestPosts, getTrendingPosts } from "@/_actions/post";
import PostFeed from "../components/PostFeed";
import { TabSelector } from "../components/TabSelector";
import { useState } from "react";

export default function AuthenticatedFeed() {
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
         {tab === "trending" && <PostFeed loadPostsFn={getTrendingPosts} />}
         {tab === "newest" && <PostFeed loadPostsFn={getNewestPosts} />}
      </>
   );
}
