import React from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="bg-[#FF7020] py-14 mb-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex items-start gap-4 text-white">
          <div className="bg-orange-400/80 p-4 rounded-md">
            <Mail size={36} className="text-white/90" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sign Up for Newsletter</h3>
            <p className="text-sm mt-2 text-white/90 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form className="flex w-full md:w-auto max-w-md ">
          <input
            type="email"
            placeholder="Enter your email here"
            className="flex-1 px-4 py-3 rounded-l-md outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-r-md hover:bg-gray-900 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;

