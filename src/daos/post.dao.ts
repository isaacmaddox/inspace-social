import { Post, Prisma, PrismaClient } from "@prisma/client";

export class PostDAO {
   private postInclude(userId?: number): Prisma.PostInclude {
      return {
         author: {
            select: {
               id: true,
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
   private popularOrderBy: Prisma.PostOrderByWithRelationInput[] = [
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
      { updatedAt: "desc" },
   ];

   constructor(private prisma: PrismaClient) { }

   private sortByPopularity(posts: DeepPost[]): DeepPost[] {
      return posts.sort((a, b) => {
         const aComments = a._count.comments;
         const bComments = b._count.comments;
         const aLikes = a._count.likes;
         const bLikes = b._count.likes;
         return bComments + bLikes - (aComments + aLikes);
      });
   }

   async getFollowingPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      const posts = await this.prisma.post.findMany({
         where: {
            parent: null,
            draft: false,
            deleted: false,
            author: {
               followers: {
                  some: {
                     id: userId,
                  },
               },
            },
         },
         include: this.postInclude(userId),
         orderBy: this.popularOrderBy,
         take: limit,
         skip: (page - 1) * limit,
      });

      return this.sortByPopularity(posts);
   }

   async getTrendingPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      const posts = await this.prisma.post.findMany({
         where: {
            parent: null,
            draft: false,
            deleted: false,
         },
         orderBy: this.popularOrderBy,
         include: this.postInclude(userId),
         take: limit,
         skip: (page - 1) * limit,
      });

      return this.sortByPopularity(posts);
   }

   async getNewestPosts({ userId, limit = 10, page = 1 }: GetPostsParams) {
      return this.prisma.post.findMany({
         where: {
            parent: null,
            draft: false,
            deleted: false,
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getUserPostFeed({ uid, userId, limit = 10, page = 1 }: GetPostsParams & { uid: number }) {
      return this.prisma.post.findMany({
         where: {
            authorId: uid,
            draft: false,
            parent: null,
            deleted: false,
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getUserDrafts({ uid, userId, limit = 10, page = 1 }: GetPostsParams & { uid: number }) {
      return this.prisma.post.findMany({
         where: {
            authorId: uid,
            draft: true,
            deleted: false,
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
      const posts = await this.prisma.post.findMany({
         where: {
            authorId: uid,
            parent: null,
            draft: false,
            deleted: false,
         },
         include: this.postInclude(userId),
         orderBy: this.popularOrderBy,
         take: limit,
         skip: (page - 1) * limit,
      });

      return this.sortByPopularity(posts);
   }

   async getUserMentions({ handle, userId, limit = 10, page = 1 }: GetPostsParams & { handle: string }) {
      return this.prisma.post.findMany({
         where: {
            content: {
               contains: `[@${handle}]`,
            },
            draft: false,
            deleted: false,
         },
         include: this.postInclude(userId),
         orderBy: {
            updatedAt: "desc",
         },
         take: limit,
         skip: (page - 1) * limit,
      });
   }

   async getPostById(postId: number, userId?: number) {
      return this.prisma.post.findUnique({
         where: {
            id: postId,
            deleted: false,
         },
         include: this.postInclude(userId),
      });
   }

   async getComments({ postId, userId, limit = 10, page = 1 }: GetPostsParams & { postId: number }) {
      const posts = await this.prisma.post.findMany({
         where: {
            parentId: postId,
            draft: false,
            deleted: false,
         },
         include: this.postInclude(userId),
         orderBy: this.popularOrderBy,
         take: limit,
         skip: (page - 1) * limit,
      });

      return this.sortByPopularity(posts);
   }
   async createPost(post: CreatePostData) {
      return this.prisma.post.create({
         data: post,
         include: {
            author: {
               select: {
                  handle: true,
               }
            }
         }
      });
   }

   async likePost({ postId, userId }: { postId: number; userId: number }) {
      try {
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
      } catch {
         return this.prisma.post.findUnique({
            where: {
               id: postId,
            },
            include: this.postInclude(userId),
         });
      }
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

   async deletePost({ postId, userId }: { postId: number; userId: number }) {
      try {
         return this.prisma.post.update({
            where: { id: postId, authorId: userId },
            data: {
               deleted: true,
            },
            include: this.postInclude(userId),
         });
      } catch {
         return null;
      }
   }
}

export interface CreatePostData {
   content: string;
   authorId: number;
   parentId?: number;
   draft: boolean;
}

export type FeedPost = Prisma.PromiseReturnType<typeof PostDAO.prototype.getTrendingPosts>[number];

export type GetPostsParams = {
   userId?: number;
   limit: number;
   page: number;
};

type DeepPost = Post & {
   _count: { likes: number; comments: number };
   likes: { userId: number }[];
   author: {
      id: number;
      displayName: string;
      handle: string;
   };
};
