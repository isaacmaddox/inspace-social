import { Metadata } from "next";
import { getSession, sendToLoginWithRedirect } from "@/_actions/auth";
import UserNotificationFeed from "@/app/components/notifications/UserNotificationFeed";

export const metadata: Metadata = {
   title: "Notifications | InSpace",
   description: "Notifications",
};

export default async function NotificationsPage() {
   const session = await getSession();

   if (!session) {
      return sendToLoginWithRedirect("/notifications");
   }

   return (
      <main>
         <UserNotificationFeed />
      </main>
   );
}
