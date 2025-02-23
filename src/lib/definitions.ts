import { z } from "zod";

export const signupSchema = z.object({
   handle: z
      .string()
      .trim()
      .min(3, "Handle must be at least 3 characters long")
      .regex(/^[a-zA-Z0-9_]+$/, "Handle cannot contain special characters or spaces"),
   email: z.string().trim().email("Invalid email address"),
   password: z.string().trim().min(1, "Password is required"),
   confirmPassword: z.string().trim().min(1, "Confirm password is required"),
});

export const loginSchema = z.object({
   email: z.string().trim().email("Invalid email address"),
   password: z.string().trim().min(1, "Password is required"),
});

export const createPostSchema = z.object({
   content: z.string().trim().min(1, "Content is required"),
   parentId: z.number().optional(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
