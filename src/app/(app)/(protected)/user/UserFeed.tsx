"use client";

import { TabSelector } from "@/app/components/TabSelector";

export default function UserProfileFeed() {
   return (
      <nav className="profile-nav">
         <TabSelector
            options={[
               { label: "Feed", value: "feed" },
               { label: "Mentions", value: "mentions" },
            ]}
         />
      </nav>
   );
}
