"use client";

import { useActionState, useEffect, useState } from "react";
import { createPost } from "@/_actions/post";
import FormField from "../FormField";
import "@/_css/layouts/post.css";

export default function CreateCommentForm({ parentId, onCommentPosted }: { parentId: number; onCommentPosted: () => void }) {
   const [formState, formAction, pending] = useActionState(createPost, null);
   const [commentLength, setCommentLength] = useState(0);

   useEffect(() => {
      if (formState?.success) {
         onCommentPosted();
      }
   }, [formState, onCommentPosted]);

   return (
      <form action={formAction} className="create-comment-form">
         <input type="hidden" name="parentId" value={parentId} />
         <FormField
            type="textarea"
            name="content"
            placeholder="Add a comment..."
            onChange={(e) => setCommentLength(e.target.value.length)}
            error={formState?.errors?.content}
         />
         <button type="submit" className="btn btn-secondary w-full" disabled={pending || commentLength === 0}>
            {pending ? "Posting..." : "Post"}
         </button>
      </form>
   );
}
