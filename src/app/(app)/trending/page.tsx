import { getTrendingPosts } from "@/_actions/post";
import PostFeed from "@/app/components/PostFeed";

export default async function TrendingPage() {
   return (
      <main>
         <PostFeed loadPostsFn={getTrendingPosts} />
      </main>
   );
}
