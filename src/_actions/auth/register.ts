"use server";

import { SignupSchema, signupSchema } from "@/lib/definitions";
import { hashPassword } from "../util";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import userDAO from "@/dal/user.dao";

export async function register(_: unknown, userData: FormData) {
   const data = Object.fromEntries(userData.entries()) as SignupSchema;

   const validatedFields = signupSchema.safeParse(data);

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors, fieldValues: data };
   }

   if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
      return { error: { confirmPassword: ["Passwords do not match"] }, fieldValues: data };
   }

   const { handle, email, password } = validatedFields.data;

   const { salt, hash } = hashPassword(password);

   try {
      await userDAO.createUser({
         email,
         password: hash,
         displayName: handle,
         handle,
         salt,
      });
   } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
         if (e.code === "P2002") {
            if ((e.meta?.target as string[]).includes("email")) {
               return { error: { email: ["Email already in use"] }, fieldValues: data };
            }
            if ((e.meta?.target as string[]).includes("handle")) {
               return { error: { handle: ["Handle already in use"] }, fieldValues: data };
            }
         }
      }

      return {
         error: {
            root: ["Something went wrong"],
         },
         fieldValues: data,
      };
   }

   redirect(`/login?email=${email}`);
}
