import AppNav from "../components/AppNav";
import "@/_css/layouts/app.css";
import AuthProvider from "../AuthProvider";
import AppSidebar from "../components/AppSidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="app-layout">
         <AuthProvider>
            <AppNav />
            {children}
            <AppSidebar />
         </AuthProvider>
      </div>
   );
}
