"use server";

import { prisma } from "@/lib/db";
import { SignupSchema, signupSchema } from "@/lib/definitions";
import { hashPassword } from "./util";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(_: unknown, userData: FormData) {
   const data = Object.fromEntries(userData.entries()) as SignupSchema;

   const validatedFields = signupSchema.safeParse(data);

   if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return { error: validatedFields.error.flatten().fieldErrors, fieldValues: data };
   }

   if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
      return { error: { confirmPassword: ["Passwords do not match"] }, fieldValues: data };
   }

   const { firstName, lastName, displayName, handle, email, bio, password } = validatedFields.data;

   const { salt, hash } = hashPassword(password);

   try {
      await prisma.user.create({
         data: {
            firstName,
            lastName,
            displayName: displayName ?? `${firstName} ${lastName}`,
            handle,
            email,
            bio,
            password: hash,
            salt,
         },
      });
   } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
         if (e.code === "P2002") {
            if (e.meta?.target === "email") {
               return { error: { email: ["Email already in use"] }, fieldValues: data };
            }
            if (e.meta?.target === "handle") {
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
