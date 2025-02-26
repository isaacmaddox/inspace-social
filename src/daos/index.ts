import { UserDAO } from "./user.dao";
import { PostDAO } from "./post.dao";
import { prisma } from "../lib/db";
import { NotificationDAO } from "./notification.dao";

export const userDao = new UserDAO(prisma);
export const postDao = new PostDAO(prisma);
export const notificationDao = new NotificationDAO(prisma);
