"use server";

import prisma from "@/lib/prismaDb";
import { User, currentUser } from "@clerk/nextjs/server";

export const getSellerInfo = async () => {
  try {
    const user: User | null = await currentUser();

    if (!user) {
      return;
    }

    const shop = await prisma.shops.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        bank: true,
      },
    });

    const orders = await prisma.orders.findMany({
      where: {
        prompt: {
          sellerId: shop?.userId,
        },
      },
      include: {
        prompt: {
          include: {
            images: true,
            reviews: true,
            promptUrl: true,
            orders: true
          }
        },
      },
    });

    return { shop, orders };
  } catch (error) {
    console.log(error);
  }
};
