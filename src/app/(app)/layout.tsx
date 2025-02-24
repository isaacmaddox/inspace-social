import AppNav from "../components/app/AppNav";
import "@/_css/layouts/app.css";
import AuthProvider from "../AuthProvider";
import AppSidebar from "../components/app/AppSidebar";
import ModalProvider from "../ModalProvider";
import LoginToContribute from "../components/modals/LogInToContribute";
import CreatePostModal from "../components/modals/CreatePost";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="app-layout">
         <AuthProvider>
            <ModalProvider>
               <LoginToContribute />
               <CreatePostModal />
               <AppNav />
               {children}
               <AppSidebar />
            </ModalProvider>
         </AuthProvider>
      </div>
   );
}
