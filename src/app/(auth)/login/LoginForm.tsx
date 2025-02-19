"use client";

import FormField from "@/app/components/FormField";
import "@/_css/forms.css";

export default function LoginForm() {
   return (
      <form>
         <FormField label="Email" name="email" type="email" placeholder="Email" defaultValue="" />
         <FormField label="Password" name="password" type="password" placeholder="Password" defaultValue="" />
         <button type="submit">Login</button>
      </form>
   );
}
