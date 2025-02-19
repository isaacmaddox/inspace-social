import { PrismaClient } from "@prisma/client";

export class PostDAO {
   private shallowPostInclude = {
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
   };

   constructor(private prisma: PrismaClient) {}

   async createPost(post: CreatePostData) {
      return this.prisma.post.create({
         data: {
            content: post.content,
            draft: post.draft,
            author: {
               connect: { id: post.authorId },
            },
            parent: post.parentId ? { connect: { id: post.parentId } } : undefined,
         },
      });
   }

   async getAllPosts({ page = 1, limit = 10 }: PaginationParams) {
      return this.prisma.post.findMany({
         orderBy: {
            createdAt: "desc",
         },
         include: this.shallowPostInclude,
         skip: (page - 1) * limit,
         take: limit,
      });
   }

   async getPostById(id: number) {
      return this.prisma.post.findUnique({
         where: { id },
         include: this.shallowPostInclude,
      });
   }

   async getCommentsByPostId(postId: number, { page = 1, limit = 10 }: PaginationParams) {
      return this.prisma.post.findMany({
         where: { parentId: postId },
         include: this.shallowPostInclude,
         skip: (page - 1) * limit,
         take: limit,
      });
   }
}

interface PaginationParams {
   page: number;
   limit: number;
}

export interface CreatePostData {
   content: string;
   draft: boolean;
   authorId: number;
   parentId?: number;
}

export type ShallowPost = Awaited<ReturnType<PostDAO["getAllPosts"]>>[number];
