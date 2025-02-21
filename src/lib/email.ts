import { Resend } from "resend";

const globalForEmail = global as unknown as { email: Resend };

export const emailClient = globalForEmail.email || new Resend(process.env.RESEND_KEY);

if (process.env.NODE_ENV !== "production") globalForEmail.email = emailClient;
