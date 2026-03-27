import { type Product } from "@/types";

export type WishListProduct = {
  id: Product["id"];
  choosenVariantSlug?: string;
};

export type WishList = WishListProduct[];

