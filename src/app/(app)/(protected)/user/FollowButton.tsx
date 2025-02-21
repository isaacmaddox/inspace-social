"use client";

import { User } from "@prisma/client";

export default function FollowButton({ user }: { user: Omit<User, "password" | "salt"> }) {
   return <button className="btn btn-secondary">Follow</button>;
}
