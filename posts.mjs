const args = process.argv.slice(2);
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
   if (args[0] === "-c") {
      const count = parseInt(args[1] ?? 1);
      for (let i = 0; i < count; i++) {
         const number = Math.floor(Math.random() * 19) + 1;
         const result = await fetch(`https://random-word-api.herokuapp.com/word?number=${number}`);
         const words = await result.json();
         const post = await prisma.post.create({
            data: {
               content: words.join(" "),
               authorId: 1,
            },
         });
         console.log(`Created post ${i + 1} of ${count}`);
      }
   } else if (args[0] === "-d") {
      const count = args[1] ? parseInt(args[1]) : undefined;
      const post = await prisma.post.deleteMany({
         limit: count,
      });
      console.log(`Deleted ${post.count} posts`);
   }
})();
