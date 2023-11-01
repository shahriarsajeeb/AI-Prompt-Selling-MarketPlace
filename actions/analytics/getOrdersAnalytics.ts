"use server";

import prisma from "@/lib/prismaDb";

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MonthsOrderData(): Promise<{
  last12Months: MonthData[];
}> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const allOrders = await prisma.orders.findMany();

    const orders = allOrders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startDate && createdAt < endDate;
    });

    const count = orders.length;

    last12Months.push({ month: monthYear, count });
  }
  return { last12Months };
}
