import { getSession } from "@/_actions/auth";
import MarkdownContainer from "@/app/components/app/MarkdownContainer";
import getUserByHandle from "@/_actions/user";
import Link from "next/link";
import FollowButton from "../FollowButton";
import UserProfileFeed from "../../../components/posts/UserProfileFeed";
import "@/_css/layouts/profile.css";

export default async function UserPage({ params }: { params: Promise<{ handle: string }> }) {
   const session = await getSession();
   const handle = (await params).handle;

   const user = await getUserByHandle(handle);

   if (!user) {
      return (
         <main className="profile-layout">
            <header>
               <h1 className="text-h2">Not Found</h1>
               <p className="text-muted">The user you are looking for does not exist.</p>
               <Link href="/" className="btn btn-sm btn-secondary">
                  Go Home
               </Link>
            </header>
         </main>
      );
   }

   return (
      <main className="profile-layout">
         <header>
            <h1 className="text-h2">{user.displayName}</h1>
            <p className="text-muted">@{user.handle}</p>
            {user.bio && <MarkdownContainer>{user.bio}</MarkdownContainer>}
            {session && (
               <div className="profile-actions">
                  {session.id === user.id ? (
                     <Link href="/settings/profile" className="btn btn-secondary w-full">
                        Edit Profile
                     </Link>
                  ) : (
                     <FollowButton />
                  )}
               </div>
            )}
         </header>
         <UserProfileFeed userId={user.id} handle={user.handle} />
      </main>
   );
}
