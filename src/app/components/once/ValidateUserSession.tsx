"use client";

import { validateUserSession } from "@/_actions/auth";
import { useEffect } from "react";

export default function ValidateUserSession() {
   useEffect(() => {
      validateUserSession();
   }, []);

   return <></>;
}
