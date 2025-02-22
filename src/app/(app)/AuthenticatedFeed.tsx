"use client";

import { getTrendingPosts } from "@/_actions/post";
import { getFollowingPosts } from "@/_actions/post";
import PostFeed from "../components/PostFeed";
import { TabSelector } from "../components/TabSelector";
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
         {tab === "following" && <PostFeed loadPostsFn={getFollowingPosts} />}
         {tab === "trending" && <PostFeed loadPostsFn={getTrendingPosts} />}
      </>
   );
}
