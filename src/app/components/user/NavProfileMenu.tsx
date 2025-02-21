import { logout } from "@/_actions/auth/logout";
import { useSession } from "@/app/SessionProvider";
import "@/_css/_components/nav-profile-menu.css";
import Link from "next/link";

export default function NavProfileMenu() {
   const { user } = useSession();

   return (
      <div className="nav-profile-menu">
         <p className="text-sm text-muted">You are logged in as</p>
         <p className="text-base text-bold text-color-heading no-margin">{user?.displayName}</p>
         <div className="nav-profile-menu-links">
            <Link href="/settings" className="btn btn-secondary w-full">
               Settings
            </Link>
            <button className="w-full" onClick={logout}>
               Logout
            </button>
         </div>
      </div>
   );
}
