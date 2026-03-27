"use client";

import * as React from "react";
import { motion } from "framer-motion";
import footerLogo from "../../../public/assets/Image/logo-footer.svg"
import { FaHeadset } from "react-icons/fa";
import appStore from "../../../public/assets/Image/appStore.png"
import googlePlay from "../../../public/assets/Image/googlePlay.png"
import { cn } from "@/utilities/cn";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type LinkItem = { label: string; href: string };

type FooterProps = {
  className?: string;
  brand?: { name: string; tagline: string };
  quickLinks?: LinkItem[];
  customerLinks?: LinkItem[];
  contact?: {
    blurb: string;
    phone: string;
    chatHref?: string;
  };
};

export default function Footer({
  className,
  brand = {
    name: "Elextra",
    tagline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  quickLinks = [
    { label: "About us", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Products", href: "#" },
    { label: "Login", href: "#" },
    { label: "Sign Up", href: "#" },
  ],
  customerLinks = [
    { label: "My Account", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Tracking List", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "My Cart", href: "#" },
  ],
  contact = {
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    phone: "+ 123 456 789",
    chatHref: "#",
  },
}: FooterProps) {
  return (
    <footer className={cn("bg-white text-[#4F4640]", className)}>
      {/* Top */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto py-10 md:py-12"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + socials */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              {/* Logo mark (bolt) */}
              {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF7020">
                <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
              </svg> */}
          <img src={footerLogo} alt="footer logo"></img>
            </div>
            <p className="mt-4 text-lg leading-6 text-[#000]/50">
              {brand.tagline}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {/* YouTube (active) */}
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-lg bg-[#FFF0E6] p-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF7020">
                  <path d="M23.5 6.2a4 4 0 00-2.8-2.8C18.8 3 12 3 12 3s-6.8 0-8.7.4A4 4 0 00.5 6.2 41 41 0 000 12a41 41 0 00.5 5.8 4 4 0 002.8 2.8C5.2 21 12 21 12 21s6.8 0 8.7-.4a4 4 0 002.8-2.8A41 41 0 0024 12a41 41 0 00-.5-5.8zM9.7 15.5V8.5l6.2 3.5-6.2 3.5z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <IconBubble ariaLabel="LinkedIn">
                <LinkedInIcon />
              </IconBubble>
              {/* Twitter/X */}
              <IconBubble ariaLabel="Twitter">
                <TwitterIcon />
              </IconBubble>
              {/* Facebook */}
              <IconBubble ariaLabel="Facebook">
                <FacebookIcon />
              </IconBubble>
              {/* Instagram */}
              <IconBubble ariaLabel="Instagram">
                <InstagramIcon />
              </IconBubble>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-bold tracking-wide">QUICK LINKS</h4>
            <nav className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-lg text-[#000000]/70 hover:text-[#FF7020]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Customer Area */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-bold tracking-wide">
              CUSTOMER AREA
            </h4>
            <nav className="mt-4 space-y-3 text-sm">
              {customerLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-lg text-[#000000]/70 hover:text-[#FF7020]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xl font-bold tracking-wide">CONTACT</h4>
            <p className="mt-4 text-base text-[#000]">{contact.blurb}</p>

         <div className="flex justify-between">
            <div className="mt-4 flex items-start gap-3">
              {/* headset icon */}
            <FaHeadset className="w-14 h-14 text-[#8D8D8D]"/>

              <div>
                <div className="text-xs text-zinc-500">Have any question?</div>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-lg font-semibold text-[#FF7020]"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Live Chat */}
            <a
              href={contact.chatHref || "#"}
              style={{borderRadius:"12px"}}
              className="mt-4 inline-flex items-center justify-center text-lg border border-blue-200 px-6 py-2  font-semibold text-[#3D7BD8] hover:bg-blue-50"
            >
              LIVE CHAT
            </a>
          </div>

            {/* Store badges */}
            <div className="mt-6 flex  items-center gap-3">
              {/* <StoreBadge type="apple" />
              <StoreBadge type="google" /> */}
              {/* <img src={appStore} alt="apple store" className="w-1/2"></img>
              <img src={googlePlay} alt="google store" className="w-1/2"></img> */}

            </div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-zinc-200" />

      {/* Bottom strip */}
      <div className="container mx-auto flex flex-col items-start gap-4 py-6 text-base text-[#5C5C5C] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-wide">ELEXTRA</span>
          <span> - </span>
          <span>© 2020 All Rights Reserved</span>
        </div>

        <div className="flex items-center gap-20">
          <span>Payment</span>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sky-500">VISA</span>
            <span className="font-semibold text-orange-400">MASTERCARD</span>
            <span className="font-semibold text-sky-400">PAYPAL</span>
            <span className="font-semibold text-amber-500">BITCOIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- small helpers / inline icons ---------- */

function IconBubble({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <a
      href="#"
      aria-label={ariaLabel}
      className="rounded-lg bg-zinc-100 p-2 text-zinc-500 hover:text-zinc-700"
    >
      {children}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8h4v13H3zM9 8h3.8v1.8h.05A4.17 4.17 0 0117.5 8c4.2 0 5 2.7 5 6.2V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.5 8.5 0 01-2.7 1.03 4.25 4.25 0 00-7.4 2.9c0 .33.04.66.1.97A12.06 12.06 0 013 5.16a4.25 4.25 0 001.32 5.67 4.22 4.22 0 01-1.93-.53v.05a4.26 4.26 0 003.41 4.17 4.3 4.3 0 01-1.92.07 4.26 4.26 0 003.98 2.96A8.53 8.53 0 012 19.54a12.04 12.04 0 006.53 1.92c7.84 0 12.13-6.5 12.13-12.13 0-.18 0-.36-.01-.54A8.67 8.67 0 0024 5.5a8.48 8.48 0 01-2.54.7z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2a3.5 3.5 0 103.5 3.5A3.5 3.5 0 0012 9.5zM18.5 6a1 1 0 11-1 1 1 1 0 011-1z" />
    </svg>
  );
}

function StoreBadge({ type }: { type: "apple" | "google" }) {
  if (type === "apple") {
    return (
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.37 1.64a4.54 4.54 0 01-1.13 3.21 3.7 3.7 0 01-2.83 1.36 4.1 4.1 0 011.13-3.08A3.77 3.77 0 0116.37 1.64zM20.65 17.2a8.17 8.17 0 01-1.17 2.19 6.47 6.47 0 01-1.55 1.57 3.69 3.69 0 01-1.88.53 3.55 3.55 0 01-1.61-.41 4.05 4.05 0 00-1.46-.41 4.63 4.63 0 00-1.5.41 3.76 3.76 0 01-1.59.42 3.62 3.62 0 01-1.9-.55 6.76 6.76 0 01-1.6-1.55A9.29 9.29 0 013.3 14.1a7.7 7.7 0 01.41-4.5 6.49 6.49 0 011.51-2.26 3.78 3.78 0 012.25-.82 4.27 4.27 0 011.79.47 4.13 4.13 0 001.44.48 5 5 0 001.6-.51 4 4 0 011.72-.42 3.69 3.69 0 012.9 1.53 5.8 5.8 0 011.07 2 6 6 0 00-3 5.85z" />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] leading-none opacity-70">
            Download on the
          </span>
          <span className="block text-sm font-semibold leading-tight">
            App Store
          </span>
        </span>
      </a>
    );
  }
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-md bg-[#1F1F1F] px-3 py-2 text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.6 12L3 4.4 4.4 3 15 13.6l-4.4 4.4L3 10.4 4.4 9l6.2 6.2zM17.1 2.9l4 4a2 2 0 010 2.8l-2.3 2.3-6.9-6.9 2.3-2.3a2 2 0 012.9 0z" />
      </svg>
      <span className="text-left">
        <span className="block text-[10px] leading-none opacity-70">GET IT ON</span>
        <span className="block text-sm font-semibold leading-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}
