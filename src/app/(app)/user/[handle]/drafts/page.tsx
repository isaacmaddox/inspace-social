import { getSession } from "@/_actions/auth";
import { getUserDrafts } from "@/_actions/post";
import { getUserById } from "@/_actions/user";
import { Back } from "@/app/components/icons";
import PostFeed from "@/app/components/posts/PostFeed";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DraftsPage({ params }: { params: { handle: string } }) {
   const session = await getSession();

   if (!session) {
      redirect(`/user/${params.handle}`);
   }

   const user = await getUserById(session?.id);

   if (!user || user.handle !== params.handle) {
      return redirect(`/user/${params.handle}`);
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
         <PostFeed feedKey="drafts" loadPostsFn={getUserDrafts} simpleEnd endMessage="No more drafts to show" />
      </main>
   );
}
