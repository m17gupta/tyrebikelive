"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";

export function Footer() {
  const socialIcons = [
    { Icon: FaFacebookF, href: "#" },
    { Icon: FaTwitter, href: "#" },
    { Icon: FaPinterestP, href: "#" },
    { Icon: FaTiktok, href: "#" },
  ];

  const productNav = [
    { label: "ROAD", href: "#" },
    { label: "URBAN", href: "#" },
    { label: "GRAVEL", href: "#" },
    { label: "MOUNTAIN", href: "#" },
    { label: "COMPANY", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#1B1B1B] text-white border-t border-white/10">
      {/* TOP STRIPE (yellow road line) */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#FFD100] via-[#FFD100] to-transparent opacity-80" />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10 space-y-12">
        {/* BRAND + QUICK NAV */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-white/10 pb-8">
          {/* LOGO + TAGLINE */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-[200px] items-center justify-center rounded-md ">
              {/* Replace with real logo image if you want */}
              <img src="/assets/img/goodyear-bike.png" alt="Goodyear Logo"></img>
            </div>
            <p className="max-w-md text-sm text-white/70 leading-relaxed">
              High-performance bicycle tires engineered for
              <span className="text-[#FFD100]">speed, control</span> and{" "}
              <span className="text-[#FFD100]">confidence</span> on every ride.
            </p>
          </div>

          {/* PRODUCT CATEGORIES */}
          <nav className="flex flex-wrap gap-4 lg:gap-6 text-[14px]  uppercase">
              <div className="flex gap-3 mt-6">
              {socialIcons.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FFD100] hover:text-black hover:border-[#FFD100] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* LINK COLUMNS + SUBSCRIBE */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
             road
            </h3>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                Eagle F1 SuperSport R
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Eagle F1 R
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Vector 4Seasons
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                Eagle F1R Z29 Aero
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
               Vector R
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
              Eagle
                </a>
              </li>

               <li>
                <a className="hover:text-[#FFD100]" href="#">
              Vector Sport
                </a>
              </li>

               <li>
                <a className="hover:text-[#FFD100]" href="#">
             Eagle Sport
                </a>
              </li>

            </ul>
          </div>

          {/* HELP & SUPPORT */}
          <div>
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
             urban/trekking
            </h3>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                  Transit Speed
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Transit Tour
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Transit Tour Plus
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Transit SUV
                </a>
              </li>
            
            </ul>
          </div>

          {/* COMPANY INFO */}
          <div>
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
             Gravel
            </h3>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a className="hover:text-[#FFD100]" href="#">
               Connector Slick
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                  Connector Speed
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
              Connector Inter
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                Peak
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                XPLR Slick
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
              XPLR Inter
                </a>
              </li>
            </ul>
          </div>


   <div>
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
            mountain
            </h3>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Peak SL
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                Peak
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Escape Inter
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Escape Max
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Wrangler MTF
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
                Wrangler MTR
                </a>
              </li>

               <li>
                <a className="hover:text-[#FFD100]" href="#">
                Newton MTF
                </a>
              </li>

               <li>
                <a className="hover:text-[#FFD100]" href="#">
                Newton MTR
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
              Wingfoot Dirt
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
              Wingfoot Park
                </a>
              </li>
            
            </ul>
          </div>



   <div>
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
            company
            </h3>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 About
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Stories
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                Wingfoot Alliance
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 Tire Pressure Calculator
                </a>
              </li>
              <li>
                <a className="hover:text-[#FFD100]" href="#">
                 TLR Installation Guide
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
                Contact
                </a>
              </li>
               <li>
                <a className="hover:text-[#FFD100]" href="#">
               OEM Contact
                </a>
              </li>

                  <li>
                <a className="hover:text-[#FFD100]" href="#">
             Distributors
                </a>
              </li>

                  <li>
                <a className="hover:text-[#FFD100]" href="#">
            T&C's
                </a>
              </li>
                  <li>
                <a className="hover:text-[#FFD100]" href="#">
              Privacy Policy
                </a>
              </li>
                  <li>
                <a className="hover:text-[#FFD100]" href="#">
             USA Shop
                </a>
              </li>
                  <li>
                <a className="hover:text-[#FFD100]" href="#">
            UK Shop
                </a>
              </li>
            </ul>
          </div>

          {/* SUBSCRIBE */}
          
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 rounded-md">
          <div className="w-full md:w-1/2">
            <h3 className="text-[16px] font-medium  uppercase mb-4 text-white/80">
              Subscribe & Get 15% Discount
            </h3>
            <p className="text-[14px] text-white/70 mb-4 leading-relaxed">
              By subscribing you agree to our Terms &amp; Conditions and Privacy
              &amp; Cookies Policy.
            </p>
          </div>

          {/* INPUT + BUTTON */}
          <div className="w-full md:w-1/2 flex items-center  rounded-md overflow-hidden bg-white/5 border border-white/15 backdrop-blur-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-[14px] outline-none bg-transparent text-white placeholder:text-white/40"
            />
            <button className="bg-[#FFD100] text-black px-6 py-3 text-[14px] font-semibold  uppercase hover:bg-[#ffe14a] transition-colors">
              Submit
            </button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT STRIP */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-center">
          {/* extra line agar chahiye to uncomment kar sakta hai */}
          <p className="text-[11px] text-white/40 mb-1">
            Goodyear (and Winged Foot Design) are trademarks of or licensed to
            The Goodyear Tire &amp; Rubber Company or Goodyear Canada Inc. used
            under license by Rubber Kinetics Corp.
          </p>
          <p className="text-[14px]  uppercase text-white/60">
            ©2025 The Goodyear Tire &amp; Rubber Company.
          </p>
        </div>
      </div>
    </footer>
  );
}
