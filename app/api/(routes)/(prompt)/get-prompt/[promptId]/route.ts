import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const promptId = params.promptId;

    if (!promptId) {
      return new NextResponse("Missing 'promptId' query parameter", {
        status: 400,
      });
    }

    const prompt: any = await prisma.prompts.findUnique({
      include: {
        orders: true,
        images: true,
        reviews: true,
        promptUrl: true,
      },
      where: {
        id: promptId,
      },
    });

    if (prompt) {
      const shop = await prisma.shops.findUnique({
        where: {
          userId: prompt?.sellerId,
        },
      });
      prompt.shop = shop;
    }

    if (prompt?.reviews) {
      for (const review of prompt?.reviews) {
        const user = await clerkClient.users.getUser(review.userId);
        review.user = user;
      }
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.log("get prompts error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
