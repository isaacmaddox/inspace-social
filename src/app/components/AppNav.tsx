"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { useSession } from "../SessionProvider";
import { logout } from "@/_actions/auth/logout";
import { usePathname } from "next/navigation";
import "@/_css/_components/app-nav.css";

export default function AppNav() {
   const { user, isLoggedIn, isLoading } = useSession();

   return (
      <nav className="app-nav">
         <header>
            <Link href="/">
               <span className="sr-only">InSpace</span>
               <Logo width={50} height={50} />
            </Link>
         </header>
         {!isLoading && isLoggedIn && (
            <ul role="list" className="nav-links">
               <NavLink href="/">For You</NavLink>
               <NavLink href="/trending">Trending</NavLink>
               <NavLink href="/following">Following</NavLink>
            </ul>
         )}
         {!isLoading && !isLoggedIn && (
            <>
               <p className="text-lg text-bold">Welcome to InSpace</p>
               <p className="text-sm text-muted">Log in to get started!</p>
               <div className="unauthenticated-nav-links">
                  <Link href="/register" className="btn btn-primary w-full">
                     Sign Up
                  </Link>
                  <Link href="/login" className="btn w-full">
                     Login
                  </Link>
               </div>
            </>
         )}
         {user && (
            <div className="nav-user-profile">
               <p className="text-bold">{user?.displayName}</p>
               <p className="text-sm text-muted">{user?.email}</p>
               <p>
                  <button className="btn btn-secondary w-full" onClick={logout}>
                     Logout
                  </button>
               </p>
            </div>
         )}
      </nav>
   );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
   const pathname = usePathname();
   const isActive = pathname === href;

   return (
      <li>
         <Link href={href} className={isActive ? "active" : ""}>
            {children}
         </Link>
      </li>
   );
}
