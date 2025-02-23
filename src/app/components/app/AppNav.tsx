"use client";

import Link from "next/link";
import { Logo } from "../icons";
import { useUser } from "../../AuthProvider";
import { usePathname } from "next/navigation";
import "@/_css/_components/app-nav.css";
import NavProfileCard from "../user/NavProfileCard";

export default function AppNav() {
   const { user, isLoggedIn, isLoading } = useUser();

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
               <NavLink href="/">Home</NavLink>
               <NavLink href="/settings">Settings</NavLink>
               <NavLink href="/notifications">Notifications</NavLink>
               <NavLink href="/groups">Groups</NavLink>
            </ul>
         )}
         {!isLoading && !isLoggedIn && (
            <div>
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
            </div>
         )}
         {user && <NavProfileCard />}
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
