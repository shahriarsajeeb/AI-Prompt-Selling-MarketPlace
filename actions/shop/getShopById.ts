"use server";
import prisma from "@/lib/prismaDb";

export const getShopById = async ({ shopId }: { shopId: string }) => {
  const shop = await prisma.shops.findUnique({
    where: {
      userId: shopId,
    },
  });
  return shop;
};
