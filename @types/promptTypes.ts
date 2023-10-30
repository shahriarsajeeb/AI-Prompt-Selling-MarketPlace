import { PromptFiles } from "@prisma/client";
import { Images } from "./ImagesTypes";
import { reviews } from "./reviewsTypes";
import { Orders } from "./OrderTypes";

export type propmt = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: Images[];
  estimatedPrice: number;
  price: number;
  category: string;
  tags: string;
  rating: number;
  reviews: reviews[];
  promptUrl: PromptFiles[];
  sellerId: string;
  orders: Orders[];
  status: "Live" | "Decliend" | "Pending";
  createdAt: Date;
  updatedAt: Date;
};
