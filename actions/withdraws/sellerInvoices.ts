"use server";

import prisma from "@/lib/prismaDb";

export const sellerInvoices = async ({ sellerId }: { sellerId: string }) => {
  try {
    const invoices = await prisma.withdraws.findMany({
      where: {
        sellerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return invoices;
  } catch (error) {
    console.log(error);
  }
};
