import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export type Order = Prisma.OrderGetPayload<{}>;
export type User = Prisma.UserGetPayload<{}>;
export type Product = Prisma.ProductGetPayload<{}>;
export type Review = Prisma.ReviewGetPayload<{}>;

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { comment, rating, product, userId } = body;

    const deliveredOrder = currentUser.orders.some((order: Order) =>
        order.products.find((item) => item.id === product.id) &&
        order.deliveryStatus === "delivered"
    );

    const userReview = product.reviews.find((review: Review) => {
        return review.userId === currentUser.id;
    });

    if (userReview || !deliveredOrder) {
        return NextResponse.error();
    }

    const review = await prisma.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId,
        }
    });

    return NextResponse.json(review);
}
