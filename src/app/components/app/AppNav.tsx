"use client";

import Link from "next/link";
import { Logo, Home, Settings, Bell, Group, Following, Drafts } from "../icons";
import { useUser } from "@/app/hooks/useUser";
import { usePathname } from "next/navigation";
import "@/_css/_components/app-nav.css";
import NavProfileCard from "../user/NavProfileCard";
import { useModal } from "@/app/hooks/useModals";

export default function AppNav() {
   const { user, isLoggedIn, isLoading } = useUser();
   const createPostModal = useModal("createpost");

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
               <NavLink href="/">
                  <Home />
                  Home
               </NavLink>
               <NavLink href="/notifications">
                  <Bell />
                  Notifications
               </NavLink>
               <NavLink href="/groups">
                  <Following />
                  Following
               </NavLink>
               <NavLink href="/groups">
                  <Group />
                  Groups
               </NavLink>
               <NavLink href="/settings">
                  <Settings />
                  Settings
               </NavLink>
               <NavLink href={`/user/${user?.handle}/drafts`}>
                  <Drafts />
                  Drafts
               </NavLink>
               <button className="btn btn-primary w-full" onClick={() => createPostModal?.open()}>
                  Create Post
               </button>
            </ul>
         )}
         {!isLoading && !isLoggedIn && (
            <div>
               <p className="text-lg text-color-heading text-bold">Welcome to InSpace</p>
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
