"use client";

import { TabSelector } from "@/app/components/TabSelector";
import { User } from "@prisma/client";

export default function OtherUserProfileFeed({ user }: { user: Omit<User, "password" | "salt"> }) {
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
