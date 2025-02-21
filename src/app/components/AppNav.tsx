"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { useSession } from "../SessionProvider";
import { logout } from "@/_actions/auth/logout";
import { usePathname } from "next/navigation";
import "@/_css/_components/app-nav.css";
import NavProfileCard from "./user/NavProfileCard";
import { useState, useRef } from "react";
import NavProfileMenu from "./user/NavProfileMenu";

export default function AppNav() {
   const { user, isLoggedIn, isLoading } = useSession();
   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);

   function handleClickOutside(e: MouseEvent) {
      e.stopImmediatePropagation();

      if (e.target !== menuRef.current && !(e.target as HTMLElement).closest(".nav-profile-menu")) {
         setIsProfileMenuOpen(false);
         document.removeEventListener("click", handleClickOutside);
         document.removeEventListener("keydown", handleEscapeKey);
      }
   }

   function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
         setIsProfileMenuOpen(false);
         document.removeEventListener("keydown", handleEscapeKey);
         document.removeEventListener("click", handleClickOutside);
      }
   }

   function handleProfileMenuClick() {
      setIsProfileMenuOpen(true);

      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
   }

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
         {user && (
            <>
               <NavProfileCard user={user} onClick={handleProfileMenuClick} />
               {isProfileMenuOpen && <NavProfileMenu />}
            </>
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
