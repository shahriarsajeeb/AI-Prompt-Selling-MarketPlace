"use server";
import prisma from "@/lib/prismaDb";

interface Props {
  rating: number;
  comment: string;
  promptId: string;
  userId: string;
}

export const newReview = async ({
  rating,
  comment,
  promptId,
  userId,
}: Props) => {
  try {
    const review = await prisma.reviews.create({
      data: {
        rating,
        comment,
        promptId,
        userId,
      },
    });

    const prompt = await prisma.prompts.findUnique({
      where: {
        id: promptId,
      },
      include: {
        reviews: true,
      },
    });
    if (prompt) {
      const reviews: any = prompt.reviews;

      reviews.push({
        rating,
      });

      let avg = 0;

      reviews &&
        reviews.forEach((rev: any) => {
          avg += rev.rating;
        });

      // update the prompt with new rating
      await prisma.prompts.update({
        where: {
          id: promptId,
        },
        data: {
          rating: avg / reviews.length,
        },
      });
    }

    const shop = await prisma.shops.findUnique({
      where: {
        userId: prompt?.sellerId,
      },
    });

    if (shop) {
      const shopRatings = shop.ratings + rating;

      await prisma.shops.update({
        where: {
          userId: prompt?.sellerId,
        },
        data: {
          ratings: shop.ratings === 0 ? shopRatings : shopRatings / 2,
        },
      });
    }

    return review;
  } catch (error) {
    console.log(error);
  }
};
