import { redirect } from "next/navigation";

export async function sendToLoginWithRedirect(redirectUrl: string) {
   redirect(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
}
