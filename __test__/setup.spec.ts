
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { prisma } from "@/lib/db";

// Mock redirect so it doesn't throw an error
jest.mock("next/navigation", () => ({
   redirect: jest.fn(),
}));

// Mock cookies
jest.mock("next/headers", () => ({
   cookies: jest.fn(() => ({
      get: jest.fn(),
   })),
}));

// Mock prisma client so we don't interact with the database
jest.mock("../src/lib/db", () => ({
   __esModule: true,
   prisma: mockDeep<PrismaClient>(),
}));

// Reset the prisma mock before each test
beforeEach(() => {
   mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
