import { useEffect, useState } from "react";

export function useHash() {
   const [hash, setHash] = useState(typeof window !== "undefined" ? (window.location.hash ?? "") : "");

   useEffect(() => {
      if (typeof window === "undefined") return;
      const handleHashChange = () => setHash(window.location.hash);
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
   }, []);

   function updateHash(hash: string) {
      window.history.replaceState(window.history.state, "", `#${hash}`);
   }

   return { hash: hash.slice(1), updateHash };
}
