"use client";

import { useEffect, useState } from "react";
import "@/_css/_components/tab-selector.css";

export function TabButton({ children, selected, callback }: { children: React.ReactNode; selected?: boolean; callback?: () => void }) {
   return (
      <button role="tab" className="btn-stripped tab-button" aria-selected={selected} onClick={callback}>
         {children}
      </button>
   );
}

export function TabSelector({ options, onChangeFn }: { options: { label: string; value: string }[]; onChangeFn?: (value: string) => void }) {
   const [selected, setSelected] = useState(options[0].value);

   useEffect(() => {
      onChangeFn?.(selected);
   }, [selected, onChangeFn]);

   return (
      <div role="tablist" className="tab-selector">
         {options.map((option) => (
            <TabButton key={option.value} selected={option.value === selected} callback={() => setSelected(option.value)}>
               {option.label}
            </TabButton>
         ))}
      </div>
   );
}
