import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type Order = Prisma.OrderGetPayload<{}>;
export type User = Prisma.UserGetPayload<{}>;
export type Product = Prisma.ProductGetPayload<{}>;
export type Review = Prisma.ProductGetPayload<{}>;
