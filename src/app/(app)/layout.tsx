import AppNav from "@/app/components/app/AppNav";
import AppSidebar from "@/app/components/app/AppSidebar";
import LoginToContribute from "@/app/components/modals/LogInToContribute";
import CreatePostModal from "@/app/components/modals/CreatePost";

import AuthProvider from "@/app/components/providers/AuthProvider";
import QueryClientWrapper from "@/app/components/providers/QueryClientWrapper";
import ModalProvider from "@/app/components/providers/ModalProvider";

import "@/_css/layouts/app.css";

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
