"use client";

import { createUser } from "@/_actions/auth/create";
import FormField from "@/app/components/FormField";
import { useActionState, useState } from "react";
import "@/_css/forms.css";
import Link from "next/link";

export default function RegisterForm() {
   const [email, setEmail] = useState("");
   const [formState, formAction, isPending] = useActionState<RegisterFormState, FormData>(createUser, {
      error: {},
      fieldValues: {},
   });

   return (
      <form action={formAction} data-testid="register-form">
         <header>
            <h1 className="text-lg text-bold">Register</h1>
            <p className="text-sm text-muted">Sign up now to get started on InSpace!</p>
         </header>
         <FormField
            label="Email"
            name="email"
            type="email"
            defaultValue={formState.fieldValues.email}
            error={formState.error.email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
         />
         <FormField
            label="Handle"
            name="handle"
            type="text"
            error={formState.error.handle}
            defaultValue={formState.fieldValues.handle || email.substring(0, email.indexOf("@"))}
         />
         <FormField label="Password" name="password" type="password" defaultValue={formState.fieldValues.password} error={formState.error.password} />
         <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            defaultValue={formState.fieldValues.confirmPassword}
            error={formState.error.confirmPassword}
         />
         <button className="btn-primary w-full" type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
         </button>
         {formState.error.root && <p className="field-error">{formState.error.root}</p>}
         <footer>
            <p className="text-sm text-muted">
               Already have an account? <Link href="/login">Login</Link>
            </p>
         </footer>
      </form>
   );
}

export interface RegisterFormState {
   error: {
      handle?: string[] | undefined;
      email?: string[] | undefined;
      password?: string[] | undefined;
      confirmPassword?: string[] | undefined;
      root?: string[] | undefined;
   };
   fieldValues: {
      handle?: string | undefined;
      email?: string | undefined;
      password?: string | undefined;
      confirmPassword?: string | undefined;
   };
}
