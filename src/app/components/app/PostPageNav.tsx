"use client";

import { Back } from "../icons";
import { useRouter } from "next/navigation";

export default function PostPageNav() {
   const router = useRouter();

   return (
      <nav className="post-nav">
         <button className="btn btn-sm" onClick={() => router.back()}>
            <Back />
            Back
         </button>
         <p className="text-bold text-base text-color-heading">Post</p>
      </nav>
   );
}
