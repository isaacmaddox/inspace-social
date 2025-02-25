import { getSession } from "@/_actions/auth";
import { getUserDrafts } from "@/_actions/post";
import { getUserById } from "@/_actions/user";
import { Back } from "@/app/components/icons";
import PostFeed from "@/app/components/posts/PostFeed";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Your Drafts | InSpace",
   description: "View your post drafts on InSpace",
};

export default async function DraftsPage({ params }: { params: Promise<{ handle: string }> }) {
   const session = await getSession();
   const { handle } = await params;

   if (!session) {
      redirect(`/user/${handle}`);
   }

   const user = await getUserById(session?.id);

   if (!user || user.handle !== handle) {
      return redirect(`/user/${handle}`);
   }

   return (
      <main>
         <nav className="post-nav">
            <Link href={`/user/${user.handle}`} className="btn btn-sm">
               <Back />
               Profile
            </Link>
            <p className="text-base text-color-heading text-bold">Drafts</p>
         </nav>
         <PostFeed feedKey="drafts" loadPostsFn={getUserDrafts} simpleEnd noClick endMessage="No more drafts to show" />
      </main>
   );
}
