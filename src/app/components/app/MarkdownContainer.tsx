import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContainer({ children, ...props }: { children: string } & React.HTMLAttributes<HTMLParagraphElement>) {
   return (
      <Markdown
         remarkPlugins={[remarkGfm]}
         components={{
            h1: ({ children }) => <p className="text-h1">{children}</p>,
            h2: ({ children }) => <p className="text-h2">{children}</p>,
            h3: ({ children }) => <p className="text-h3">{children}</p>,
            h4: ({ children }) => <p className="text-h4">{children}</p>,
            h5: ({ children }) => <p className="text-h5">{children}</p>,
            h6: ({ children }) => <p className="text-h6">{children}</p>,
            p: ({ children }) => (
               <p className="text-body" {...props}>
                  {children}
               </p>
            ),
            a: ({ children, ...props }) => (
               <Link
                  className="text-link"
                  target={props.href?.startsWith(process.env.NEXT_PUBLIC_APP_URL!) ? "_self" : "_blank"}
                  href={props.href ?? "/"}
                  {...props}>
                  {children}
               </Link>
            ),
         }}>
         {children}
      </Markdown>
   );
}
