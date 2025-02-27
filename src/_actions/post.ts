"use server";

import { postDao } from "@/daos";
import { CreatePostSchema, createPostSchema } from "@/lib/definitions";
import { getSession } from "./auth";
import { GetPostsParams, FeedPost } from "@/daos/post.dao";
import { sendMentionNotifications } from "./notifications";

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

   return await postDao.getUserPostFeed({ uid, userId: user?.id, limit, page });
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
   const user = await getSession();
   return postDao.getPostById(postId, user?.id);
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

   const handleMatches = content.matchAll(/@([A-Za-z0-9_]+)/g);

   const mentions = Array.from(handleMatches)
      .map((match) => match[1])
      .reduce((acc, mention) => {
         if (acc.includes(mention)) return acc;
         return [...acc, mention];
      }, [] as string[]);

   const processedContent = content.replaceAll(/@([A-Za-z0-9_]+)/g, `[@$1](${process.env.NEXT_PUBLIC_APP_URL}/user/$1)`);

   const post = await postDao.createPost({
      authorId: user.id,
      content: processedContent,
      parentId: parentId ?? undefined,
      draft: data.type === "draft",
   });

   if (!post) return { success: false, errors: { content: ["Failed to create post"] } };

   // Send notifications to everyone mentioned in the post
   await sendMentionNotifications(mentions, post.id, user.id);

   return { success: true, errors: null };
}

export async function deletePost({ postId }: { postId: number }) {
   const user = await getSession();
   if (!user) return;
   return postDao.deletePost({ postId, userId: user.id });
}
