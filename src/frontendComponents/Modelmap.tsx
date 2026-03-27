import React from "react";

/* -------------------------------------------------------------------------- */
/*                                   MODEL MAP                                */
/* -------------------------------------------------------------------------- */

const Modelmap = () => {
  const xColumns = [
    "ENDURANCE ROAD",
    "ALL-ROUND ROAD",
    "ROAD RACE",
    "TIME TRIAL",
  ];

  const yRows = [
    { key: "UHP", tone: "uhp" },
    { key: "FS*", tone: "fs" },
    { key: "HP", tone: "hp" },
    { key: "P", tone: "p" },
  ];

  const bars = [
    { row: "UHP", label: "EAGLE F1 SUPERSport R", left: 60, width: 36, tone: "uhp" },
    { row: "UHP", label: "EAGLE F1R", left: 28, width: 60, tone: "uhp" },

    { row: "FS*", label: "VECTOR 4SEASONS", left: 0, width: 42, tone: "hp" },
    { row: "FS*", label: "EAGLE F1R Z29 AERO", left: 24, width: 66, tone: "fs" },
    { row: "FS*", label: "VECTOR R", left: 20, width: 48, tone: "fs" },

    { row: "HP", label: "EAGLE", left: 22, width: 52, tone: "hp" },
    { row: "HP", label: "VECTOR SPORT", left: 0, width: 46, tone: "hp" },

    { row: "P", label: "EAGLE SPORT", left: 22, width: 44, tone: "p" },
  ];

  return (
    <section id="modelmap" className="bg-white py-20 md:py-24">
      <div className="container-xl mx-auto px-0 md:px-6">
        <div className="grid lg:grid-cols-[0.8fr_1.8fr] gap-12 md:gap-16">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-neutral-500">
              Model Map.
            </p>

            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
              The Goodyear Range of Road Tires
            </h2>

            <div className="mt-8 space-y-5 text-sm md:text-[15px] leading-relaxed text-neutral-600">
              <p>
                This model map provides an overview of the road range, and where
                each model and series are positioned in terms of intended usage.
              </p>

              <p>
                <strong>X-Axis</strong> = Recommended use case <br />
                <strong>Y-Axis</strong> = Series type
              </p>

              <p>
                The range consists of 3 series, Ultra High-Performance,
                High-Performance, and Performance.
              </p>

              <p>
                <strong>*Fitment Series</strong> = Optimized for specific
                fitments and intended usage.
              </p>
            </div>
          </div>

          {/* RIGHT CHART */}
          <div className="rounded-[18px] border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] overflow-hidden">
            {/* Horizontal scroll wrapper */}
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                {/* X AXIS HEADER */}
                <div className="grid grid-cols-4 bg-neutral-800 text-white text-[11px] md:text-[12px] tracking-[0.18em] uppercase">
                  {xColumns.map((c) => (
                    <div
                      key={c}
                      className="py-4 text-center border-r border-white/10 last:border-r-0"
                    >
                      {c}
                    </div>
                  ))}
                </div>

                {/* CHART BODY */}
                <div className="relative">
                  {/* Y AXIS */}
                  <div className="absolute left-0 top-0 bottom-0 w-[76px] border-r border-neutral-200">
                    {yRows.map((r) => (
                      <div
                        key={r.key}
                        className={`h-[112px] flex items-center justify-center font-semibold tracking-[0.22em] text-[12px] text-white ${toneBg(
                          r.tone
                        )}`}
                      >
                        {r.key}
                      </div>
                    ))}
                  </div>

                  {/* PLOT */}
                  <div className="ml-[76px] p-6">
                    <div className="relative rounded-[14px] border border-neutral-200 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.15)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />

                      {yRows.map((r) => (
                        <div
                          key={r.key}
                          className="relative h-[112px] border-b border-neutral-200 last:border-b-0"
                        >
                          {bars
                            .filter((b) => b.row === r.key)
                            .map((b, i) => (
                              <div
                                key={i}
                                className={`absolute top-1/2 -translate-y-1/2 h-[46px] px-4 rounded-[14px] flex items-center ${barTone(
                                  b.tone
                                )}`}
                                style={{
                                  left: `${b.left}%`,
                                  width: `${b.width}%`,
                                }}
                              >
                                <span className="text-white text-[12px] font-semibold uppercase whitespace-nowrap">
                                  {b.label}
                                </span>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>

                    {/* LEGEND */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Legend label="ULTRA HIGH-PERFORMANCE" tone="uhp" />
                      <Legend label="*FITMENT SERIES" tone="fs" />
                      <Legend label="HIGH-PERFORMANCE" tone="hp" />
                      <Legend label="PERFORMANCE" tone="p" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* scroll hint */}
            <p className="text-xs text-neutral-400 text-center py-3 md:hidden">
              ← Swipe to explore →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

const toneBg = (tone: string) => {
  if (tone === "uhp") return "bg-[#2F628D]";
  if (tone === "fs") return "bg-[#4B4F55]";
  if (tone === "hp") return "bg-[#3E6E94]";
  return "bg-[#9BB8CF]";
};

const barTone = (tone: string) => {
  if (tone === "uhp") return "bg-[#1F2A37]";
  if (tone === "fs") return "bg-[#45484D]";
  if (tone === "hp") return "bg-[#3A556E]";
  return "bg-[#8FA8BF]";
};

const Legend = ({ label, tone }: { label: string; tone: string }) => (
  <div
    className={`rounded-full py-3 text-center text-[11px] font-semibold text-white ${toneBg(
      tone
    )}`}
  >
    {label}
  </div>
);

export default Modelmap;

