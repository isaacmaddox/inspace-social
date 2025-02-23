"use client";

import { useEffect, useRef, useState } from "react";
import "@/_css/_components/tab-selector.css";
import { useHash } from "@/app/hooks/useHash";

export function TabButton({
   children,
   selected,
   callback,
   value,
}: {
   children: React.ReactNode;
   selected?: boolean;
   value: string;
   callback?: (value: string) => void;
}) {
   return (
      <button role="tab" onClick={() => callback?.(value)} className="btn-stripped tab-button" aria-selected={selected}>
         {children}
      </button>
   );
}

export function TabSelector({ options, onChangeFn }: { options: { label: string; value: string }[]; onChangeFn: (value: string) => void }) {
   const [selected, setSelected] = useState(options[0].value);
   const { hash, updateHash } = useHash();
   const firstLoad = useRef(true);

   useEffect(() => {
      if (!firstLoad.current) return;
      if (hash && options.some((option) => option.value === hash)) {
         setSelected(hash);
         onChangeFn(hash);
      } else {
         setSelected(options[0].value);
         onChangeFn(options[0].value);
      }
      firstLoad.current = false;
   }, [hash, options, onChangeFn]);

   function handleChange(value: string) {
      updateHash(value);
      setSelected(value);
      onChangeFn(value);
   }

   return (
      <div role="tablist" className="tab-selector">
         {options.map((option) => (
            <TabButton key={option.value} selected={option.value === selected} callback={handleChange} value={option.value}>
               {option.label}
            </TabButton>
         ))}
      </div>
   );
}
