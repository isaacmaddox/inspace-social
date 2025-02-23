import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (process.argv[2] === "-c") {
   (async () => {
      for (let i = 0; i < process.argv[3]; i++) {
         const content = await fetch("https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1");
         const data = await content.json();

         await prisma.post.create({
            data: {
               content: data[0],
               authorId: 1,
            },
         });

         console.log(`Created post ${i + 1}`);
      }
   })();
}

if (process.argv[2] === "-d") {
   if (process.argv[3]) {
      for (let i = 0; i < process.argv[3]; i++) {
         await prisma.post.deleteMany({
            limit: Number(process.argv[3])
         })
      }
   } else {
      await prisma.post.deleteMany();
   }
}
