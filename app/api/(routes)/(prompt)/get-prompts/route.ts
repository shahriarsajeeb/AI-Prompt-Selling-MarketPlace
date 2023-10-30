import prisma from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);
    const pageNumber = query.page ? parseInt(query.page.toString(), 10) : 1;

    const pageSize = 8;

    const prompts: any = await prisma.prompts.findMany({
      include: {
        orders: true,
        images: true,
        reviews: true,
        promptUrl: true,
      },
      where: {
        status: "Live",
      },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (prompts) {
      for (const prompt of prompts) {
        const shop = await prisma.shops.findUnique({
          where: {
            userId: prompt.sellerId,
          },
        });
        prompt.shop = shop;
      }
    }

    const totalPrompts = await prisma.prompts.findMany({
      where: {
        status: "Live",
      },
    });

    return NextResponse.json({ prompts, totalPrompts });
  } catch (error) {
    console.log("get prompts error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
