"use client";

import { useActionState, useEffect } from "react";
import { createPost } from "@/_actions/post";
import FormField from "../FormField";
import "@/_css/layouts/post.css";

export default function CreateCommentForm({ parentId, onCommentPosted }: { parentId: number; onCommentPosted: () => void }) {
   const [formState, formAction, pending] = useActionState(createPost, null);

   useEffect(() => {
      if (formState?.success) {
         onCommentPosted();
      }
   }, [formState, onCommentPosted]);

   return (
      <form action={formAction} className="create-comment-form">
         <input type="hidden" name="parentId" value={parentId} />
         <FormField type="textarea" name="content" placeholder="Add a comment..." error={formState?.errors?.content} />
         <button type="submit" className="btn btn-secondary w-full" disabled={pending}>
            {pending ? "Posting..." : "Post"}
         </button>
      </form>
   );
}
