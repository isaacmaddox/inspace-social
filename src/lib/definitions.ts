import { z } from "zod";

export const signupSchema = z.object({
   firstName: z.string().trim().min(1, "First name is required"),
   lastName: z.string().trim().min(1, "Last name is required"),
   displayName: z.string().trim(),
   handle: z.string().trim().min(3, "Handle must be at least 3 characters long"),
   email: z.string().trim().email("Invalid email address"),
   bio: z.string().trim(),
   password: z.string().trim().min(1, "Password is required"),
   confirmPassword: z.string().trim().min(1, "Confirm password is required"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
