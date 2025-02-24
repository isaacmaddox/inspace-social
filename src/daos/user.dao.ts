import { PrismaClient } from "@prisma/client";

export class UserDAO {
   constructor(private prisma: PrismaClient) {}

   async createUser(user: CreateUserData) {
      return this.prisma.user.create({
         data: {
            email: user.email,
            password: user.password,
            displayName: user.displayName,
            handle: user.handle,
            salt: user.salt,
         },
      });
   }

   async getUserByEmail(email: string) {
      return this.prisma.user.findUnique({
         where: { email },
      });
   }

   async getUserByHandle(handle: string) {
      return this.prisma.user.findUnique({
         where: { handle },
      });
   }

   async getUserById(id: number) {
      return this.prisma.user.findUnique({
         where: { id },
      });
   }

   async checkIfFollowing(userId: number, followingId: number) {
      return this.prisma.user.findUnique({
         where: { id: userId, following: { some: { id: followingId } } },
      });
   }

   async followUser(userId: number, followingId: number) {
      return this.prisma.user.update({
         where: { id: userId },
         data: { following: { connect: { id: followingId } } },
      });
   }

   async unfollowUser(userId: number, followingId: number) {
      return this.prisma.user.update({
         where: { id: userId },
         data: { following: { disconnect: { id: followingId } } },
      });
   }
}

export interface CreateUserData {
   email: string;
   password: string;
   displayName: string;
   handle: string;
   salt: string;
}
