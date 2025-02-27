"use client";

import { getNotifications } from "@/_actions/notifications";
import { TabSelector } from "../app/TabSelector";
import { useState } from "react";
import NotificationFeed from "./NotificationFeed";

export default function UserNotificationFeed() {
   const [tab, setTab] = useState("all");

   return (
      <>
         <nav>
            <TabSelector
               onChangeFn={setTab}
               options={[
                  { label: "All", value: "all" },
                  { label: "Mentions", value: "mentions" },
               ]}
            />
         </nav>
         {tab === "all" && <NotificationFeed getNotificationsFn={getNotifications} />}
      </>
   );
}
