"use client";

import { motion } from "motion/react";
import { useState } from "react";

const steps = [
  {
    id: 1,
    label: "Step 01",
    title: "Peanuts are grown in East-Southern states",
    short: "Grown on farms",
    icon: "🌱",
  },
  {
    id: 2,
    label: "Step 02",
    title: "Delivered to Los Angeles",
    short: "Shipped to LA",
    icon: "🚚",
  },
  {
    id: 3,
    label: "Step 03",
    title: "Freshly roasted in our factory",
    short: "Freshly roasted",
    icon: "🔥",
  },
  {
    id: 4,
    label: "Step 04",
    title: "Delivered to your home",
    short: "Delivered to you",
    icon: "🏠",
  },
];

const benefits = [
  {
    title: "Free Shipping",
    text: "All domestic orders",
    icon: "📦",
  },
  {
    title: "Secure Payments",
    text: "Safe and encrypted checkout",
    icon: "🔒",
  },
  {
    title: "Customer Priority",
    text: "Quick responses and support",
    icon: "💬",
  },
  {
    title: "Made With Love",
    text: "Carefully roasted since 1991",
    icon: "❤️",
  },
];

const page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From Farm to Your Home
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            Follow the journey of our peanuts, from East-Southern farms to fresh
            roasting in California and delivery to your doorstep.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: visual + timeline */}
          <div>
            {/* Visual card with motion */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-400 p-6 shadow-xl"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
                  K H Food
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  The Peanut Journey
                </h3>
                <p className="mt-2 text-sm text-amber-100/90">
                  Every batch is freshly roasted in our California factory to
                  bring out the best flavor and crunch.
                </p>

                {/* Animated icon  */}
                <motion.div
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-amber-100/10 px-4 py-2 backdrop-blur"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-lg">🚚</span>
                  <span className="text-xs font-medium text-amber-50">
                    Fresh batches on the move
                  </span>
                </motion.div>

                {/* Progress indicator */}
                <div className="mt-8 flex items-center gap-3 text-xs font-medium text-amber-100">
                  <span>{activeStep.label}</span>
                  <div className="h-[2px] flex-1 rounded-full bg-amber-200/40">
                    <motion.div
                      className="h-[2px] rounded-full bg-white"
                      layout
                      initial={false}
                      style={{
                        width: `${(activeStep.id / steps.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span>{activeStep.id}/{steps.length}</span>
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  {activeStep.short}
                </p>
              </div>

              {/* Background peanuts / shapes */}
              <div className="pointer-events-none absolute -right-10 top-6 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-orange-400/40 blur-3xl" />
            </motion.div>

            {/* Horizontal stepper - scrollable on mobile */}
            <motion.div
              className="mt-8 overflow-x-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex min-w-max gap-4 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-amber-100">
                {steps.map((step) => {
                  const isActive = step.id === activeStep.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step)}
                      className={`relative flex flex-1 min-w-[150px] flex-col items-start rounded-xl px-4 py-3 text-left transition-all ${
                        isActive
                          ? "bg-amber-600 text-white shadow-md"
                          : "bg-white text-slate-800 hover:bg-amber-50"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className="pointer-events-none absolute inset-0 rounded-xl border border-amber-300/80"
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 text-xl">
                        {step.icon}
                      </span>
                      <span className="relative z-10 mt-2 text-xs font-semibold uppercase tracking-[0.2em]">
                        {step.label}
                      </span>
                      <span className="relative z-10 mt-1 text-sm font-medium">
                        {step.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: detailed step description + benefits */}
          <div className="space-y-8">
            {/* Active step detail */}
            <motion.div
              key={activeStep.id}
              className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-amber-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                {activeStep.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {activeStep.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                From carefully selected farms to controlled roasting conditions,
                every step is designed to protect freshness, crunch, and flavor.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Strict quality checks at each stage of the journey.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Roasted in small batches in our California facility.</span>
                </li>
              </ul>
            </motion.div>

            {/* Benefits grid */}
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {benefits.map((b, idx) => (
                <motion.div
                  key={b.title}
                  className="group relative overflow-hidden rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-amber-100"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-600">{b.text}</p>
                    </div>
                  </div>
                  {/* subtle animated underline */}
                  <motion.div
                    className="mt-3 h-[2px] w-10 rounded-full bg-amber-400"
                    initial={{ width: 32 }}
                    whileHover={{ width: 60 }}
                    transition={{ duration: 0.25 }}
                  />
                  {/* floating peanut highlight */}
                  <motion.div
                    className="pointer-events-none absolute -right-6 -top-6 h-14 w-14 rounded-full bg-amber-100/80 blur-xl group-hover:bg-amber-200/80"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Small story line */}
            <p className="text-xs text-slate-500">
              K H Food has been roasting peanuts in Orange County, California
              since 1991, always focused on delivering the highest quality in
              every pack.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;