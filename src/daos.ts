import { UserDAO } from "./daos/user.dao";
import { PostDAO } from "./daos/post.dao";
import { prisma } from "./lib/db";

export const userDao = new UserDAO(prisma);
export const postDao = new PostDAO(prisma);
