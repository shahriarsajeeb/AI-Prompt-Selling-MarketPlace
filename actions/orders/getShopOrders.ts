import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getShopOrders = async ({ sellerId }: { sellerId: string }) => {
  try {
    const orders: any = await prisma.orders.findMany({
      where: {
        prompt: {
          sellerId,
        },
      },
      include: {
        prompt: true,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });

    for (const order of orders) {
      const userId = order?.userId;
      if (userId) {
        const user = await clerkClient.users.getUser(userId);
        order.user = user;
      }
    }
    
    return orders;
  } catch (error) {
    console.log(error);
  }
};
