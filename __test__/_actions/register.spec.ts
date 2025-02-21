import { register } from "@/_actions/auth/register";
import { redirect } from "next/navigation";
import { UserDAO } from "@/dal/user.dao";
import { prismaMock } from "../setup.spec";

describe("Register Action", () => {
   beforeEach(() => {
      jest.mock("../../src/dal/user.dao", () => {
         return {
            createUser: jest.fn().mockResolvedValue({
               id: 1,
               email: "test@test.com",
               displayName: "Test User",
               handle: "test",
               bio: null,
               password: "password",
               salt: "salt",
               createdAt: new Date(),
               updatedAt: new Date(),
            }),
         } as unknown as UserDAO;
      });
   });

   it("Should return errors when fields are invalid", async () => {
      const { error, fieldValues } = await register({}, new FormData());

      expect(error).not.toEqual({});
      expect(fieldValues).toEqual({});
   });

   it("Should create a user when fields are valid", async () => {
      const formData = new FormData();
      formData.append("email", "test@test.com");
      formData.append("password", "password");
      formData.append("confirmPassword", "password");
      formData.append("handle", "test");

      const returnValue = await register({}, formData);

      expect(returnValue).toBeUndefined();
      expect(prismaMock.user.create).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith("/login?email=test@test.com");
   });
});
