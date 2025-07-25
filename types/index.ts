import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
  insertReviewSchema
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews:number
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type shippingAddress = z.infer<typeof shippingAddressSchema>;
export type orderItem = z.infer<typeof insertOrderItemSchema>;
export type order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderItems: orderItem[];
  user: { name: string; email: string };
  paymentResult :PaymentResult ;
}

export type PaymentResult = z.infer<typeof paymentResultSchema>;

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};