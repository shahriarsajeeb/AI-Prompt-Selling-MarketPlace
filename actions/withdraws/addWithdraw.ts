"use server";
import prisma from "@/lib/prismaDb";

type Props = {
  sellerId: string;
  amount: number;
};

export const addWithdraw = async ({ sellerId, amount }: Props) => {
  try {
    const respose = await prisma.withdraws.create({
      data: {
        sellerId,
        amount,
        status: "Pending",
      },
    });

    return respose;
  } catch (error) {
    console.log(error);
  }
};
