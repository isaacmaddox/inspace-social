import "@/_css/layouts/auth.css";
import { getSession } from "@/_actions/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
   const session = await getSession();

   if (session) {
      redirect("/");
   }

   return <main className="auth-layout">{children}</main>;
}
