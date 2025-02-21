import { prisma } from "@/lib/db";
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
}

export interface CreateUserData {
   email: string;
   password: string;
   displayName: string;
   handle: string;
   salt: string;
}

export default new UserDAO(prisma);
