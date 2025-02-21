import { PrismaClient } from "@prisma/client";

export class PostDAO {
   constructor(private prisma: PrismaClient) {}

   async getFollowingPosts({ userId, limit = 10, page = 1 }: { userId: number; limit: number; page: number }) {
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
         include: {
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
         },
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getTrendingPosts({ limit = 10, page = 1 }: { limit: number; page: number }) {
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
         include: {
            author: {
               select: {
                  displayName: true,
                  handle: true,
               },
            },
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async createPost(post: CreatePostData) {
      return this.prisma.post.create({
         data: post,
      });
   }
}

export interface CreatePostData {
   content: string;
   authorId: number;
   parentId?: number;
}
