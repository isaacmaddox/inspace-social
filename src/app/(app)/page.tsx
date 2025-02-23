import { getSession } from "@/_actions/auth";
import AuthenticatedFeed from "@/app/components/posts/AuthenticatedFeed";
import UnauthenticatedFeed from "@/app/components/posts/UnauthenticatedFeed";

export default async function ForYouFeed() {
   const session = await getSession();

   return <main>{session ? <AuthenticatedFeed /> : <UnauthenticatedFeed />}</main>;
}
