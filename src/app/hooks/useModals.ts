import { useContext } from "react";
import { ModalContext } from "@/app/components/providers/ModalProvider";

export function useModal(id: string) {
   const modalCtx = useContext(ModalContext);

   if (!modalCtx) throw new Error("useModal must be used in a child of the ModalProvider component");

   return modalCtx.getModal(id);
}

export function useModals() {
   const modalCtx = useContext(ModalContext);

   if (!modalCtx) throw new Error("useModals must be used in a child of the ModalProvider component");

   return modalCtx;
}
