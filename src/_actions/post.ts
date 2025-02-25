"use server";

import { postDao } from "@/daos";
import { CreatePostSchema, createPostSchema } from "@/lib/definitions";
import { getSession } from "./auth";
import { GetPostsParams, FeedPost } from "@/daos/post.dao";

export const getFollowingPosts = async ({ page, limit }: GetPostsParams): Promise<FeedPost[]> => {
   const user = await getSession();
   if (!user) return [];
   return await postDao.getFollowingPosts({ userId: user.id, limit, page });
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

export const getUserDrafts = async ({ page, limit }: GetPostsParams) => {
   const user = await getSession();
   if (!user) return [];
   return await postDao.getUserDrafts({ uid: user.id, limit, page });
};

export const getUserPopularPosts = async ({ uid, page, limit }: GetPostsParams & { uid: number }) => {
   const user = await getSession();
   return await postDao.getUserPopularPosts({ uid, userId: user?.id, limit, page });
};

export const getUserMentions = async ({ handle, page, limit }: GetPostsParams & { handle: string }) => {
   const user = await getSession();
   return await postDao.getUserMentions({ handle, userId: user?.id, limit, page });
};

export const getComments = async ({ postId, page, limit }: GetPostsParams & { postId: number }) => {
   const user = await getSession();
   return await postDao.getComments({ postId, userId: user?.id, limit, page });
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

export const getPostById = async (postId: number) => {
   return postDao.getPostById(postId);
};

export async function createPost(_: unknown, createPostData: FormData) {
   const user = await getSession();
   if (!user) return { success: false, errors: null };

   const data = Object.fromEntries(createPostData.entries()) as unknown as CreatePostSchema;

   const validatedFields = createPostSchema.safeParse(data);

   if (!validatedFields.success) {
      return { success: false, errors: validatedFields.error.flatten().fieldErrors, fieldValues: data };
   }

   const { content, parentId } = validatedFields.data;

   const processedContent = content.replaceAll(/@(\S+)/g, `[@$1](${process.env.NEXT_PUBLIC_APP_URL}/user/$1)`);

   const post = await postDao.createPost({
      authorId: user.id,
      content: processedContent,
      parentId: parentId ?? undefined,
      draft: data.type === "draft",
   });

   if (!post) return { success: false, errors: { content: ["Failed to create post"] } };

   return { success: true, errors: null };
}
