import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/_css/global.css";
import LocalStorageClear from "./components/once/LocalStorageClear";
import ValidateUserSession from "./components/once/ValidateUserSession";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "InSpace",
   description: "InSpace - Decide what you want to see",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <LocalStorageClear />
            <ValidateUserSession />
            {children}
         </body>
      </html>
   );
}
