"use client";
import { useRef } from "react";
import type { ReactNode } from "react";

export const NavWrapper = (props: { baseClass?: string; children: ReactNode }) => {
  const { baseClass, children } = props;
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <aside className={[baseClass, `${baseClass}--nav-hydrated`].filter(Boolean).join(" ")}>
      <div className={`${baseClass}__scroll`} ref={navRef}>
        {children}
      </div>
    </aside>
  );
};

