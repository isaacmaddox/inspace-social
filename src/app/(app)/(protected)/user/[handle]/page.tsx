import { getSession } from "@/_actions/auth";
import MarkdownContainer from "@/app/components/MarkdownContainer";
import getUserByHandle from "@/_actions/user";
import { notFound } from "next/navigation";
import UserProfileFeed from "../UserFeed";
import "@/_css/layouts/profile.css";
import Link from "next/link";
import FollowButton from "../FollowButton";

export default async function UserPage({ params }: { params: Promise<{ handle: string }> }) {
   const session = (await getSession())!;
   const handle = (await params).handle;

   const user = await getUserByHandle(handle);

   if (!user) {
      return notFound();
   }

   return (
      <main className="profile-layout">
         <header>
            <h1 className="text-h2">{user.displayName}</h1>
            <p className="text-muted">@{user.handle}</p>
            {user.bio && <MarkdownContainer>{user.bio}</MarkdownContainer>}
            <div className="profile-actions">
               {session.id === user.id ? (
                  <Link href="/settings/profile" className="btn btn-secondary w-full">
                     Edit Profile
                  </Link>
               ) : (
                  <FollowButton user={user} />
               )}
            </div>
         </header>
         <UserProfileFeed user={user} />
         <div style={{ height: "200vh" }}></div>
      </main>
   );
}
