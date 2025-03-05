"use client";

import { useState } from "react";
import { TabSelector } from "../app/TabSelector";
import NotificationFeed from "./NotificationFeed";
import { getAllNotifications, getMentionsNotifications } from "@/_actions/notifications";

export default function UserNotificationFeed() {
   const [selectedTab, setSelectedTab] = useState("all");

   return (
      <>
         <nav>
            <TabSelector
               options={[
                  { label: "All", value: "all" },
                  { label: "Mentions", value: "mentions" },
               ]}
               onChangeFn={setSelectedTab}
            />
         </nav>
         {selectedTab === "all" && <NotificationFeed loadNotificationsFn={getAllNotifications} />}
         {selectedTab === "mentions" && <NotificationFeed loadNotificationsFn={getMentionsNotifications} />}
      </>
   );
}
