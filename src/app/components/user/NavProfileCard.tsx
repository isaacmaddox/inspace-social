"use client";

import "@/_css/_components/profile-card.css";
import { useUser } from "@/app/hooks/useUser";
import { logout } from "@/_actions/auth";
import { useRouter } from "next/navigation";

export default function NavProfileCard() {
   const { user: sessionUser } = useUser();
   const router = useRouter();

   function goToProfile() {
      router.push(`/user/${sessionUser?.handle}`);
   }

   return (
      <div className="profile-card" role="button" onClick={goToProfile}>
         <span>
            <p className="text-normal text-bold">{sessionUser?.displayName}</p>
            <small className="text-sm text-muted">{sessionUser?.email}</small>
         </span>
         <button
            className="btn-sm"
            type="button"
            onClick={(e) => {
               e.stopPropagation();
               logout();
            }}>
            Logout
         </button>
      </div>
   );
}
