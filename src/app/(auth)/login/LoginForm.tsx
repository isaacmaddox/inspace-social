"use client";

import FormField from "@/app/components/FormField";
import "@/_css/forms.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/_actions/auth/login";
import { useActionState } from "react";

export default function LoginForm() {
   const params = useSearchParams();
   const email = params.get("email") ?? "";

   const [formState, formAction, isPending] = useActionState<LoginFormState, FormData>(loginUser, {
      error: {},
      fieldValues: {},
   });

   return (
      <form action={formAction} data-testid="login-form">
         <header>
            <h1 className="text-lg text-bold">Login</h1>
            <p className="text-sm text-muted">Log in to your InSpace account to continue.</p>
         </header>
         <FormField
            autoFocus
            label="Email"
            name="email"
            type="email"
            defaultValue={formState.fieldValues.email ?? email}
            error={formState.error.email}
         />
         <FormField label="Password" name="password" type="password" defaultValue={formState.fieldValues.password} error={formState.error.password} />
         <button type="submit" className="btn-primary w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
         </button>
         <footer>
            <p className="text-sm text-muted">
               Don't have an account? <Link href="/register">Register</Link>
            </p>
         </footer>
      </form>
   );
}

interface LoginFormState {
   error: {
      email?: string[] | undefined;
      password?: string[] | undefined;
   };
   fieldValues: {
      email?: string | undefined;
      password?: string | undefined;
   };
}
