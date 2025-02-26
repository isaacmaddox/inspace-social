"use client";

import FormField from "@/app/components/FormField";
import "@/_css/forms.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "@/_actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
   const params = useSearchParams();
   const email = params.get("email") ?? "";
   const redirect = params.get("redirect") ?? "/";

   const loginWithRedirectAction = (_: unknown, userData: FormData) => login(_, userData, redirect);

   const [formState, formAction, isPending] = useActionState<LoginFormState, FormData>(loginWithRedirectAction, {
      error: {},
      fieldValues: {},
   });

   localStorage.clear();

   return (
      <form action={formAction} data-testid="login-form">
         <header>
            <h1 className="text-lg text-bold">Login</h1>
            <p className="text-sm text-muted">Log in to your InSpace account to continue.</p>
         </header>
         {redirect && <input type="hidden" name="redirect" value={redirect} />}
         <FormField
            autoFocus={!email}
            label="Email"
            name="email"
            type="email"
            defaultValue={formState.fieldValues.email ?? email}
            error={formState.error.email}
         />
         <FormField
            label="Password"
            name="password"
            type="password"
            defaultValue={formState.fieldValues.password}
            error={formState.error.password}
            autoFocus={!!email}
         />
         <button type="submit" className="btn-primary w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
         </button>
         <footer>
            <p className="text-sm text-muted">
               Don&apos;t have an account? <Link href="/register">Register</Link>
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
