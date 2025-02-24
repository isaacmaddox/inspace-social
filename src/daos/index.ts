import { UserDAO } from "./user.dao";
import { PostDAO } from "./post.dao";
import { prisma } from "../lib/db";

export const userDao = new UserDAO(prisma);
export const postDao = new PostDAO(prisma);
