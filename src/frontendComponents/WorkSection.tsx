"use client";

export default function WorkSection() {
  const slides = [
    {
      title: "WFA.",
      description:
        "ESCAPE noun (TRAIL MTB SERIES™) 1. Introducing two new trail MTB tires: Escape Inter and Escape Max, engineered to perform across a wide spectrum of terrains and trail conditions. 2. Designed for riders who demand versatility and control, these tires can be precisely tailored to match your riding style and intended usage.",
      button: "LEARN MORE",
    },
  ];

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* PARALLAX BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage:
            "url('https://www.goodyearbike.com/wp-content/uploads/2024/05/Z30NSW-fadeV4.png')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 md:px-16 text-white">
        {slides.map((item, index) => (
          <div
            key={index}
            className="text-center max-w-6xl mx-auto"
          >
            <h1 className="md:text-[180px] text-[90px] font-semibold leading-none mb-6">
              {item.title}
            </h1>

            <p className="md:text-lg text-md text-gray-200 mb-8">
              {item.description}
            </p>

            <button className="px-7 py-3 bg-[#FFD100] hover:bg-[#e6c200] transition text-black font-semibold">
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

