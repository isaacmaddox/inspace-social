"use client";

import React, { createContext, useState } from "react";
import "@/_css/_components/modals.css";

export const ModalContext = createContext<ModalContext>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
   const [modals, setModals] = useState<Modal[]>([]);

   function registerModal(newModal: CreateModalProps) {
      if (!modals.find((m) => m.id === newModal.id)) {
         setModals([
            ...modals,
            {
               ...newModal,
               open: () => {
                  newModal.setOpen(true);
               },
               close: () => {
                  newModal.setOpen(false);
               },
            },
         ]);
      }
   }

   function getModal(id: string) {
      return modals.find((m) => m.id === id);
   }

   return <ModalContext.Provider value={{ registerModal, getModal }}>{children}</ModalContext.Provider>;
}

type ModalContext = {
   registerModal: (newModal: CreateModalProps) => void;
   getModal: (id: string) => Modal | undefined;
} | null;

interface CreateModalProps {
   id: string;
   setOpen: (open: boolean) => void;
}

interface Modal extends CreateModalProps {
   open: () => void;
   close: () => void;
}
