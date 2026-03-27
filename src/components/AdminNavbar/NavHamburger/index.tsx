"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NavHamburger = ({ baseClass }: { baseClass?: string }) => {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <button
      className={`${baseClass}__mobile-close`}
      onClick={() => setNavOpen(false)}
      tabIndex={!navOpen ? -1 : undefined}
      type="button"
    >
      {navOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
};

