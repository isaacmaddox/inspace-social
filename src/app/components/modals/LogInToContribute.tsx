"use client";

import { useModals } from "@/app/ModalProvider";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LoginToContribute() {
   const { registerModal } = useModals();
   const dialogRef = useRef<HTMLDialogElement>(null);

   function openModal(isOpen: boolean) {
      if (isOpen) dialogRef.current?.showModal();
      else dialogRef.current?.close();
   }

   useEffect(() => {
      registerModal({
         id: "logintocontribute",
         jsx: LoginToContribute,
         setOpen: openModal,
      });
   }, [registerModal]);

   return (
      <dialog ref={dialogRef}>
         <h2 className="text-lg text-bold">Log in to Contribute</h2>
         <p className="text-normal">If you want to like a post or comment, you&apos;ll need to be signed into your InSpace account.</p>
         <footer className="modal-actions">
            <Link href="/login" className="btn btn-secondary">
               Log in
            </Link>
            <Link href="/register" className="btn">
               Register
            </Link>
         </footer>
         <button className="close-modal btn-stripped" onClick={() => openModal(false)}>
            Close
         </button>
      </dialog>
   );
}
