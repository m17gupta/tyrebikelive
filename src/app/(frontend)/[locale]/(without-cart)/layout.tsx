import { type ReactNode } from "react";

import Header from "@/components/Header";

const WithoutCartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default WithoutCartLayout;
