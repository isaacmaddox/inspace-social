"use client";

export default function LocalStorageClear() {
   if (typeof window === "undefined") return <></>;

   window.addEventListener("beforeunload", () => {
      localStorage.clear();
   });

   return <></>;
}
