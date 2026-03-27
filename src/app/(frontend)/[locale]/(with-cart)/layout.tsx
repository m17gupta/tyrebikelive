import { type ReactNode } from "react";

import { SynchronizeCart } from "@/components/(ecommerce)/Cart/SynchronizeCart";
import { Cart } from "@/components/Cart";
import { WishList } from "@/components/WishList";
import Header from "@/frontendComponents/sections/Header";



const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SynchronizeCart />
      <Header />

      <Cart />
      <WishList />
      {children}
    </>
  );
};
export default CartLayout;
