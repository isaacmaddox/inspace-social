import { Prisma, PrismaClient } from "@prisma/client";

export type GetPostsParams = {
   userId?: number;
   limit: number;
   page: number;
};

export class PostDAO {
   private postInclude(userId?: number): Prisma.PostInclude {
      return {
         author: {
            select: {
               displayName: true,
               handle: true,
            },
         },
         _count: {
            select: {
               likes: true,
               comments: true,
            },
         },
         likes: userId ? { where: { userId } } : undefined,
      } as const;
   }

   constructor(private prisma: PrismaClient) { }

   async getFollowingPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      return this.prisma.post.findMany({
         where: {
            parent: null,
            author: {
               followers: {
                  some: {
                     id: userId,
                  },
               },
            },
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getTrendingPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      return this.prisma.post.findMany({
         where: {
            parent: null,
         },
         orderBy: [
            {
               comments: {
                  _count: "desc",
               },
            },
            {
               likes: {
                  _count: "desc",
               },
            },
            {
               updatedAt: "desc",
            },
         ],
         include: this.postInclude(userId),
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getNewestPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      return this.prisma.post.findMany({
         where: {
            parent: null,
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getUserPosts({ uid, userId, limit = 10, page = 1 }: GetPostsParams & { uid: number }) {
      return this.prisma.post.findMany({
         where: {
            authorId: uid,
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getUserPopularPosts({ uid, userId, limit = 10, page = 1 }: GetPostsParams & { uid: number }) {
      return this.prisma.post.findMany({
         where: {
            authorId: uid,
         },
         include: this.postInclude(userId),
         orderBy: [
            { comments: { _count: "desc" } },
            { likes: { _count: "desc" } },
            { updatedAt: "desc" },
         ],
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getUserMentions({ handle, userId, limit = 10, page = 1 }: GetPostsParams & { handle: string; }) {
      return this.prisma.post.findMany({
         where: {
            content: {
               contains: `[@${handle}]`,
            },
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getPostById(postId: number) {
      return this.prisma.post.findUnique({
         where: {
            id: postId,
         },
         include: this.postInclude(),
      });
   }

   async getComments({ postId, userId, limit = 10, page = 1 }: GetPostsParams & { postId: number }) {
      return this.prisma.post.findMany({
         where: {
            parentId: postId,
         },
         include: this.postInclude(userId),
         orderBy: [
            { comments: { _count: "desc" } },
            { likes: { _count: "desc" } },
            { updatedAt: "desc" },
         ],
         take: limit,
         skip: (page - 1) * limit,
      });
   }
   async createPost(post: CreatePostData) {
      return this.prisma.post.create({
         data: post,
      });
   }

   async likePost({ postId, userId }: { postId: number; userId: number }) {
      return this.prisma.post.update({
         where: {
            id: postId,
         },
         data: {
            likes: {
               create: {
                  userId,
               },
            },
         },
         include: this.postInclude(userId),
      });
   }

   async unlikePost({ postId, userId }: { postId: number; userId: number }) {
      return this.prisma.post.update({
         where: {
            id: postId,
         },
         data: {
            likes: {
               delete: {
                  postId_userId: {
                     postId,
                     userId,
                  },
               },
            },
         },
         include: this.postInclude(userId),
      });
   }
}

export interface CreatePostData {
   content: string;
   authorId: number;
   parentId?: number;
}

export type FeedPost = Prisma.PromiseReturnType<typeof PostDAO.prototype.getTrendingPosts>[number];
