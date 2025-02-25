import { useContext } from "react";
import { UserContext } from "@/app/components/providers/AuthProvider";

export function useUser() {
   const ctx = useContext(UserContext);

   if (!ctx) {
      throw new Error("useUser must be used within a UserContext");
   }

   return ctx;
}
