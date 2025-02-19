import { PrismaClient } from "@prisma/client";

export class UserDAO {
   constructor(private prisma: PrismaClient) {}

   async createUser(user: CreateUserData) {
      return this.prisma.user.create({
         data: {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
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
   firstName: string;
   lastName: string;
   displayName: string;
   handle: string;
   salt: string;
}
