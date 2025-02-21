import { login } from "@/_actions/auth";
import { prismaMock } from "../setup.spec";

describe("Login Action", () => {
   it("Should return errors when fields are invalid", async () => {
      const { error, fieldValues } = await login({}, new FormData());

      expect(error).not.toEqual({});
      expect(fieldValues).toEqual({});
   });

   it("Should return errors when user is not found", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const { error, fieldValues } = await login({}, new FormData());

      expect(error).not.toEqual({});
      expect(fieldValues).toEqual({});
   });
});
