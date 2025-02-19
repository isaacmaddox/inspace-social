import crypto from "crypto";

export function hashPassword(password: string, existingSalt?: string) {
   const salt = existingSalt ?? crypto.randomBytes(16);

   const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512");

   return {
      salt: salt.toString("hex"),
      hash: hash.toString("hex"),
   };
}

export function omit<D extends object, T extends keyof D>(data: D, keys: T[]): Omit<D, T> {
   const result = { ...data };

   keys.forEach((key) => {
      delete result[key];
   });

   return result;
}
