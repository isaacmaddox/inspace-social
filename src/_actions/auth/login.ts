"use server";

import { LoginSchema, loginSchema } from "@/lib/definitions";
import { hashPassword, omit, pick } from "../util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sign } from "jsonwebtoken";
import { userDao } from "@/daos";

export async function login(_: unknown, userData: FormData) {
   const data = Object.fromEntries(userData.entries()) as LoginSchema;

   const validatedFields = loginSchema.safeParse(data);

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors, fieldValues: data };
   }

   const { email, password } = validatedFields.data;

   const user = await userDao.getUserByEmail(email);

   if (!user) {
      return { error: { email: ["Invalid email or password"] }, fieldValues: omit(data, ["password"]) };
   }

   const passwordsMatch = hashPassword(password, user.salt).hash === user.password;

   if (!passwordsMatch) {
      return { error: { email: ["Invalid email or password"] }, fieldValues: omit(data, ["password"]) };
   }

   const cookieStore = await cookies();
   const sessionData = pick(user, ["id", "email"]);
   const session = sign(sessionData, process.env.JWT_SECRET!, {
      expiresIn: "30d",
   });

   cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
   });

   redirect("/");
}
