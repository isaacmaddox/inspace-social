"use client";

import { createUser } from "@/_actions/user/create";
import FormField from "@/app/components/FormField";
import { useActionState, useState } from "react";
import "@/_css/forms.css";

export interface RegisterFormState {
   error: {
      firstName?: string[] | undefined;
      lastName?: string[] | undefined;
      displayName?: string[] | undefined;
      handle?: string[] | undefined;
      email?: string[] | undefined;
      password?: string[] | undefined;
      confirmPassword?: string[] | undefined;
      root?: string[] | undefined;
   };
   fieldValues: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      displayName?: string | undefined;
      handle?: string | undefined;
      email?: string | undefined;
      password?: string | undefined;
      confirmPassword?: string | undefined;
      bio?: string | undefined;
   };
}

export default function RegisterForm() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [formState, formAction, isPending] = useActionState<RegisterFormState, FormData>(createUser, {
      error: {
         firstName: [],
         lastName: [],
         displayName: [],
         handle: [],
         email: [],
         password: [],
         confirmPassword: [],
         root: [],
      },
      fieldValues: {
         email: "",
         password: "",
         confirmPassword: "",
         firstName: "",
         lastName: "",
         displayName: "",
         handle: "",
         bio: "",
      },
   });

   return (
      <form action={formAction}>
         <div className="form-field-group">
            <FormField
               label="First Name"
               name="firstName"
               type="text"
               defaultValue={formState.fieldValues.firstName}
               error={formState.error.firstName}
               onChange={(e) => setFirstName(e.target.value)}
            />
            <FormField
               label="Last Name"
               name="lastName"
               type="text"
               defaultValue={formState.fieldValues.lastName}
               error={formState.error.lastName}
               onChange={(e) => setLastName(e.target.value)}
            />
         </div>
         <FormField
            label="Email"
            name="email"
            type="email"
            defaultValue={formState.fieldValues.email}
            error={formState.error.email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <FormField
            label="Display Name"
            name="displayName"
            type="text"
            placeholder={`${firstName} ${lastName}`}
            defaultValue={formState.fieldValues.displayName}
            error={formState.error.displayName}
         />
         <FormField
            label="Handle"
            name="handle"
            type="text"
            defaultValue={formState.fieldValues.handle}
            error={formState.error.handle}
            placeholder={email.substring(0, email.indexOf("@"))}
         />
         <FormField label="Password" name="password" type="password" defaultValue={formState.fieldValues.password} error={formState.error.password} />
         <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            defaultValue={formState.fieldValues.confirmPassword}
            error={formState.error.confirmPassword}
         />
         <button className="primary w-full" type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
         </button>
      </form>
   );
}
