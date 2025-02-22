"use server";

import { postDao } from "@/daos";
import { CreatePostSchema, createPostSchema } from "@/lib/definitions";
import { getSession } from "./auth";
import { redirect } from "next/navigation";

export const getFollowingPosts = async ({ userId, page, limit }: { userId?: number; page: number; limit: number }) => {
   if (!userId) return [];
   return await postDao.getFollowingPosts({ userId, limit, page });
};

export const getTrendingPosts = async ({ page, limit }: { page: number; limit: number }) => {
   return postDao.getTrendingPosts({ limit, page });
};

export async function createPost(_: unknown, createPostData: FormData) {
   const data = Object.fromEntries(createPostData.entries()) as unknown as CreatePostSchema;

   const validatedFields = createPostSchema.safeParse(data);

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors, fieldValues: data };
   }

   const { content, parentId } = validatedFields.data;

   const user = await getSession();

   if (!user) {
      redirect("/login");
   }

   return await postDao.createPost({
      authorId: user.id,
      content,
      parentId: parentId ?? undefined,
   });
}
