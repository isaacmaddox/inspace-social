import AppNav from "../components/app/AppNav";
import "@/_css/layouts/app.css";
import AuthProvider from "../components/AuthProvider";
import AppSidebar from "../components/app/AppSidebar";
import ModalProvider from "../components/ModalProvider";
import LoginToContribute from "../components/modals/LogInToContribute";
import CreatePostModal from "../components/modals/CreatePost";
import QueryClientWrapper from "../components/QueryClientWrapper";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="app-layout">
         <AuthProvider>
            <QueryClientWrapper>
               <ModalProvider>
                  <LoginToContribute />
                  <CreatePostModal />
                  <AppNav />
                  {children}
                  <AppSidebar />
               </ModalProvider>
            </QueryClientWrapper>
         </AuthProvider>
      </div>
   );
}
