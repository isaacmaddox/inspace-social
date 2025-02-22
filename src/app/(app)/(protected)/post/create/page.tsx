"use client";

import FormField from "@/app/components/FormField";
import { useActionState } from "react";
import { createPost } from "@/_actions/post";

export default function CreatePost() {
   const [, formAction, isPending] = useActionState(createPost, null);

   return (
      <form action={formAction}>
         <FormField label="Body" name="content" type="text" />
         <button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
         </button>
      </form>
   );
}
