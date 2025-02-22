import { getSession } from "@/_actions/auth";
import AuthenticatedFeed from "./AuthenticatedFeed";
import UnauthenticatedFeed from "./UnauthenticatedFeed";

export default async function ForYouFeed() {
   const session = await getSession();

   return <main>{session ? <AuthenticatedFeed /> : <UnauthenticatedFeed />}</main>;
}
