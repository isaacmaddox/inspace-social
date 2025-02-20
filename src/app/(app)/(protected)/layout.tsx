import { getSession } from "@/_actions/auth/session";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   const session = await getSession();

   if (!session) {
      redirect("/login");
   }

   return children;
}
