"use server";

import { postDao } from "@/daos";
import { CreatePostSchema, createPostSchema } from "@/lib/definitions";
import { getSession } from "./auth";
import { redirect } from "next/navigation";
import { GetPostsParams } from "@/daos/post.dao";

export const getFollowingPosts = async ({ page, limit }: GetPostsParams) => {
   const user = await getSession();
   return await postDao.getFollowingPosts({ userId: user?.id, limit, page });
};

export const getTrendingPosts = async ({ page, limit }: GetPostsParams) => {
   const user = await getSession();
   return await postDao.getTrendingPosts({ userId: user?.id, limit, page });
};

export const getNewestPosts = async ({ page, limit }: GetPostsParams) => {
   const user = await getSession();
   return await postDao.getNewestPosts({ userId: user?.id, limit, page });
};

export const getUserPosts = async ({ uid, page, limit }: GetPostsParams & { uid: number }) => {
   const user = await getSession();
   return await postDao.getUserPosts({ uid, userId: user?.id, limit, page });
};

export const likePost = async ({ postId }: { postId: number }) => {
   const user = await getSession();
   if (!user) return;
   return postDao.likePost({ postId, userId: user.id });
};

export const unlikePost = async ({ postId }: { postId: number }) => {
   const user = await getSession();
   if (!user) return;
   return postDao.unlikePost({ postId, userId: user.id });
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
