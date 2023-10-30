import { propmt } from "./promptTypes";

export type Orders = {
  id: string;
  userId: string;
  promptId: string;
  prompt: propmt;
  payment_method: string;
  payment_id: string;
  createdAt: Date;
  updatedAt: Date;
};
