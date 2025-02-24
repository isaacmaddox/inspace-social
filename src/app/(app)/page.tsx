import { getSession } from "@/_actions/auth";
import AuthenticatedFeed from "@/app/components/posts/AuthenticatedFeed";
import UnauthenticatedFeed from "@/app/components/posts/UnauthenticatedFeed";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Your Feed | InSpace",
   description: "See posts from the people you follow.",
};

export default async function ForYouFeed() {
   const session = await getSession();

   return <main>{session ? <AuthenticatedFeed /> : <UnauthenticatedFeed />}</main>;
}
