"use client";

import { checkIfFollowing, followUser, unfollowUser } from "@/_actions/user";
import { useCallback, useEffect, useState } from "react";

export default function FollowButton({ userId }: { userId: number }) {
   const [isFollowing, setIsFollowing] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const checkFollow = useCallback(async () => {
      const following = await checkIfFollowing(userId);
      setIsFollowing(following);
      setIsLoading(false);
   }, [userId]);

   async function handleFollow() {
      if (isFollowing) {
         await unfollowUser(userId);
      } else {
         await followUser(userId);
      }
      checkFollow();
   }

   useEffect(() => {
      checkFollow();
   }, [checkFollow]);

   return (
      <button className={`btn w-full ${isFollowing ? "" : "btn-secondary"}`} disabled={isLoading} onClick={handleFollow}>
         {isFollowing ? "Unfollow" : "Follow"}
      </button>
   );
}
