import React from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="mb-8 bg-[#FF7020] py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
        {/* Left Section */}
        <div className="flex items-start gap-4 text-white">
          <div className="rounded-md bg-orange-400/80 p-4">
            <Mail size={36} className="text-white/90" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sign Up for Newsletter</h3>
            <p className="mt-2 max-w-md text-sm text-white/90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form className="flex w-full max-w-md md:w-auto">
          <input
            type="email"
            placeholder="Enter your email here"
            className="flex-1 rounded-l-md px-4 py-3 text-gray-700 outline-none"
          />
          <button
            type="submit"
            className="rounded-r-md bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;

