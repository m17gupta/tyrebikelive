import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rakesh Kumar",
    role: "Farmer, Rajasthan",
    image: "/assets/users/user1.jpg",
    message:
      "The guidance and technical training provided helped us adopt better agricultural practices and improve productivity.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anjali Devi",
    role: "Self Help Group Member",
    image: "/assets/users/user2.jpg",
    message:
      "Their support has empowered women and helped us build confidence in leadership and community development.",
    rating: 4,
  },
  {
    id: 3,
    name: "Vijay Singh",
    role: "Youth Participant",
    image: "/assets/users/user3.jpg",
    message:
      "The youth training sessions were eye-opening and helped us gain practical skills for future opportunities.",
    rating: 5,
  },
  {
    id: 4,
    name: "Suman Patel",
    role: "Community Leader",
    image: "/assets/users/user4.jpg",
    message:
      "Their field activities and dedication towards rural development has transformed several communities.",
    rating: 5,
  },
];
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const TestimonialsPage = () => {
  return (
    <div className="w-full bg-[#121212] text-white">

      {/* ================= HERO SECTION ================= */}



         <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/Image/project-image2.png')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 h-full flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
          Testimonials
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-300">
           Hear from people whose lives and communities we have impacted.
          </p>
        </motion.div>
      </section>


      {/* ================= TESTIMONIAL GRID ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto ">
        <h2 className="text-3xl font-semibold text-center mb-14 text-gray-200">
          What People Say About Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#3a3a3a] border border-[#3a3a3a] rounded-none p-7 py-14 shadow-lg hover:shadow-xl hover:border-[#DEBB70] transition-all duration-300"
            >
              {/* Photo */}
              <div className="flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border border-gray-700 object-cover"
                />
              </div>

              {/* Name + Role */}
              <h3 className="text-xl font-semibold text-center">{item.name}</h3>
              <p className="text-gray-400 text-center text-sm mb-2">{item.role}</p>

              {/* Rating */}
              <div className="flex justify-center gap-1 my-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-300 text-center leading-relaxed">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 bg-[#121212] text-center ">
        <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Let's collaborate and create meaningful impact together.
        </p>

        <a
          href="/contact"
          className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default TestimonialsPage;

