import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prismaDb";
import { User, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user: User | null = await currentUser();

    if (!data.images) {
      data.images = [];
    }

    if (data.images && data.images.length > 0) {
      const validImages = data.images.filter(
        (image: string) => image !== undefined
      );
      const uploadedImages = await Promise.all(
        validImages.map(async (image: string) => {
          const result = await cloudinary.uploader.upload(image);
          return {
            create: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          };
        })
      );

      data.images = {
        createMany: {
          data: uploadedImages.map((image) => image.create),
        },
      };
    }

    if (data.attachments && data.attachments.length > 0) {
      const uploadedAttachments = await Promise.all(
        data.attachments.map(async (attachment: string) => {
          const result = await cloudinary.uploader.upload(attachment, {
            resource_type: "auto",
          });
          return { public_id: result.public_id, url: result.secure_url };
        })
      );
      data.promptUrl = uploadedAttachments;
      delete data.attachments;
    }

    data.estimatedPrice = parseFloat(data.estimatedPrice);
    data.price = parseFloat(data.price);

    const promptUrlData = data.promptUrl;
    delete data.promptUrl;

    const sellerId = user?.id;

    const newPrompt = await prisma.prompts.create({
      data: {
        ...data,
        images: data.images,
        promptUrl: {
          createMany: {
            data: promptUrlData.map((prompt: any) => ({
              public_id: prompt.public_id,
              url: prompt.url,
            })),
          },
        },
        sellerId,
      },
    });

    return NextResponse.json(newPrompt);
  } catch (error) {
    console.log("create prompt error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
