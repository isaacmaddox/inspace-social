"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function logout() {
   const cookieStore = await cookies();
   cookieStore.delete("session");

   revalidatePath("/", "layout");
}
