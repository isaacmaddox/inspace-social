"use client";

import { createPost } from "@/_actions/post";
import { useModals } from "@/app/ModalProvider";
import { useActionState, useEffect, useRef } from "react";
import FormField from "../FormField";
import "@/_css/_components/create-post-modal.css";

export default function CreatePostModal() {
   const { registerModal } = useModals();
   const [formState, formAction] = useActionState(createPost, null);
   const dialogRef = useRef<HTMLDialogElement>(null);
   const submitRef = useRef<HTMLButtonElement>(null);
   const typeRef = useRef<HTMLInputElement>(null);

   function openModal(isOpen: boolean) {
      if (isOpen) dialogRef.current?.showModal();
      else dialogRef.current?.close();
   }

   useEffect(() => {
      registerModal({
         id: "createpost",
         setOpen: openModal,
      });

      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key === "Enter") {
            e.preventDefault();
            submitRef.current?.click();
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [registerModal]);

   useEffect(() => {
      if (formState?.success) {
         openModal(false);
      }
   }, [formState]);

   function saveDraft() {
      if (typeRef.current) typeRef.current.value = "draft";
   }

   return (
      <dialog ref={dialogRef} onClick={() => openModal(false)} className="create-post-modal">
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form action={formAction}>
               <input type="hidden" name="type" value="post" ref={typeRef} />
               <FormField type="textarea" name="content" placeholder="What's on your mind?" />
               <footer className="modal-actions">
                  <button type="submit" className="btn btn-secondary" ref={submitRef}>
                     Post
                  </button>
                  <button type="submit" className="btn" onClick={saveDraft}>
                     Save Draft
                  </button>
               </footer>
            </form>
         </div>
      </dialog>
   );
}
