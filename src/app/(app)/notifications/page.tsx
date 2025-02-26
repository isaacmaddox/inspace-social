import { Back } from "@/app/components/icons";
import { Metadata } from "next";
import Link from "next/link";
import { getSession, sendToLoginWithRedirect } from "@/_actions/auth";
import NotificationFeed from "@/app/components/notifications/NotificationFeed";
import { getNotifications } from "@/_actions/notifications";

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
         <nav className="subpage-nav">
            <Link href="/" className="btn btn-sm">
               <Back />
               Home
            </Link>
            <p className="text-base text-color-heading text-bold">Notifications</p>
         </nav>
         <NotificationFeed getNotificationsFn={getNotifications} />
      </main>
   );
}
