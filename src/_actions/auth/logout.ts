"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
   const cookieStore = await cookies();
   cookieStore.delete("session");

   redirect("/login");
}
