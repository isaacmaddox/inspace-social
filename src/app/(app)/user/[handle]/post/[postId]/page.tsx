import getUserByHandle from "@/_actions/user";
import { notFound } from "next/navigation";
import { getPostById } from "@/_actions/post";
import Post from "@/app/components/posts/Post";
import PostCommentFeed from "@/app/components/posts/PostCommentFeed";

export default async function PostPage({ params }: { params: Promise<{ handle: string; postId: string }> }) {
   const { handle, postId } = await params;

   const user = await getUserByHandle(handle);

   if (!user) {
      return notFound();
   }

   const post = await getPostById(Number(postId));

   if (!post) {
      return notFound();
   }

   return (
      <main className="profile-layout post-feed">
         <Post noClick post={post} />
         <div className="feed-heading-container">
            <h2 className="text-lg text-bold text-color-heading">Comments</h2>
         </div>
         <PostCommentFeed postId={Number(postId)} handle={handle} />
      </main>
   );
}
