"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Wrench, Recycle, Sun } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Eco-Friendly Materials",
    desc: "We craft our furniture using responsibly sourced, environmentally friendly materials.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Effortless Assembly",
    desc: "Thoughtfully designed for quick setup, requiring minimal effort and no extra tools.",
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    title: "Giving Back to Nature",
    desc: "Every purchase contributes to reforestation efforts, helping restore green spaces.",
  },
  {
    icon: <Sun className="w-8 h-8" />,
    title: "Sustainable Production",
    desc: "Dedicated to reducing waste and promoting eco-conscious manufacturing practices.",
  },
];

export default function OurWork() {
  return (
    <div className="w-full bg-white py-20">
      <div className="container-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">

        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items- text-start space-y-4"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F5F5F5]">
              {item.icon}
            </div>

            <h3 className="text-lg font-medium text-start uppercase ">{item.title}</h3>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

