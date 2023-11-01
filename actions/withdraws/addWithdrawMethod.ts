"use server";
import prisma from "@/lib/prismaDb";

type withDrawMethodData = {
  account_holder_name: string;
  bank_name: string;
  bank_address: string;
  sellerId: string;
  account_number: number;
  routing_number: number;
  swift_code: string;
};

export const addWithDrawMethod = async ({
  account_holder_name,
  bank_name,
  bank_address,
  sellerId,
  account_number,
  routing_number,
  swift_code,
}: withDrawMethodData) => {
  try {
    const withDrawMethod = await prisma.banks.create({
      data: {
        sellerId,
        account_holder_name,
        bank_name,
        bank_address,
        account_number,
        routing_number,
        swift_code,
      },
    });

    return withDrawMethod;
  } catch (error) {
    console.log(error);
  }
};
