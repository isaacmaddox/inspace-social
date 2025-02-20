import AppNav from "../components/AppNav";
import "@/_css/layouts.css";
import SessionProvider from "../SessionProvider";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="app-layout">
         <SessionProvider>
            <AppNav />
            <main>{children}</main>
         </SessionProvider>
      </div>
   );
}
