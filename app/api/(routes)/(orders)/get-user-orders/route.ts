import { User, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";

export async function GET(req: NextRequest) {
  try {
    const user: User | null = await currentUser();

    if (!user) {
      return new NextResponse("Please login to access this resources!", {
        status: 400,
      });
    }

    const orders = await prisma.orders.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        prompt: {
          include: {
            promptUrl: true,
            reviews: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("load user error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
