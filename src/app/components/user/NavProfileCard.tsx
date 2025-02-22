"use client";

import "@/_css/_components/profile-card.css";
import Link from "next/link";
import { useUser } from "@/app/AuthProvider";
import { logout } from "@/_actions/auth";

export default function NavProfileCard() {
   const { user: sessionUser } = useUser();

   return (
      <Link href={`/user/${sessionUser?.handle}`} className="profile-card" role="button">
         <span>
            <p className="text-normal text-bold">{sessionUser?.displayName}</p>
            <small className="text-sm text-muted">{sessionUser?.email}</small>
         </span>
         <button
            className="btn-sm"
            onClick={(e) => {
               e.preventDefault();
               logout();
            }}>
            Logout
         </button>
      </Link>
   );
}
