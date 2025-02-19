import Link from "next/link";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <nav>
            <Link href="/">For You</Link>
         </nav>
         {children}
      </main>
   );
}
