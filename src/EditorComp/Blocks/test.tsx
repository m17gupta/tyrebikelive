import React, { useState } from "react";
import { Building2, LayoutGrid } from "lucide-react";
import { LuHouse } from "react-icons/lu";

const PortfolioFull = ({
  // layout props
  marginleft = "auto",
  marginright = "auto",
  margintop = 0,
  marginbotton = 0,
  width = 85,

  // hero / about props
  backgroundColor = "#fff",
  backgroundImage = "./assets/Image/about-image.jpg",
  AboutImage = "./assets/Image/about-image.jpg",
  fontsize = "50",
  fontsizeContent = "18",
  AboutTitleSize = "42",
  AboutTitleContent = "18",
  AboutSubTitleSize = "20",

  // services props
  ServicesTitle = "OUR SERVICES",
  ServicesTitleSize = "42",
  ServicesTitleColor = "#000",
  ServicesContentSize = "18",
  ServicesBg = "#f7f7f7",
  SerTitleSize = "20",

  // project props
  ProjectTitle = "OUR PROJECTS",
  ProjectTitleSize = "48px",
  ProjectTitleColor = "#000",
  ProjectBackground = "#fff",
  ProjectFilterColor = "#000",
  ProjectFilterActiveColor = "#d1b28f",
  ProjectCardTitleSize = "22px",
  ProjectCardCategorySize = "14px",
  ProjectCardTitleColor = "#fff",
  ProjectCardCategoryColor = "#d1b28f",

  // blog props
  BlogTitleSize = "24",
  BlogTitleColor = "#000",
}) => {
  const [active, setActive] = useState("All Projects");

  const projects = [
    {
      category: "Commercial",
      title: "Terra Office",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop",
      type: "Commercial",
    },
    {
      category: "Interior",
      title: "Vishakha Office Interior",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop",
      type: "Interior",
    },
    {
      category: "Residential",
      title: "Urban Forest For Alembic Group, Bangalore",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop",
      type: "Residential",
    },
    {
      category: "Interior",
      title: "Scandinavian Interior of Apartment, Mumbai",
      image:
        "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop",
      type: "Interior",
    },
    {
      category: "Religious",
      title: "The Emerald Gulistan Mosque At Kanpur",
      image:
        "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop",
      type: "Religious",
    },
    {
      category: "Religious",
      title: "Chapel Of Unity, Rwanda",
      image:
        "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop",
      type: "Religious",
    },
  ];

  const filters = [
    "All Projects",
    "Commercial",
    "Hospitality",
    "Institutional",
    "Interior",
    "Religious",
    "Residential",
    "Townships",
  ];

  const filtered =
    active === "All Projects"
      ? projects
      : projects.filter((p) => p.type === active);

  // small helper for responsive numeric px values (if user passes number strings)
  const px = (v) => (typeof v === "number" ? `${v}px` : v);

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      {/* Global responsive styles + animations (inline <style>) */}
      <style>{`
        /* Responsive grids and text scaling */
        .pf-container { max-width: 1200px; margin: 0 auto; }
        @media (max-width: 1024px) { .pf-container { padding: 0 28px; } }
        @media (max-width: 768px) { .pf-container { padding: 0 20px; } }

        /* HERO responsive */
        .pf-hero-title { transition: all .35s ease; }
        @media (max-width: 768px) { .pf-hero-title { font-size: 28px !important; } }

        /* About grid */
        .pf-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; }
        @media (max-width: 900px) { .pf-about-grid { grid-template-columns: 1fr; text-align: center; } .pf-about-grid img { margin: 18px auto 0; max-width: 100%; } }

        /* Services grid */
        .pf-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .pf-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pf-services-grid { grid-template-columns: 1fr; } }

        /* Projects grid */
        .pf-project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        @media (max-width: 1024px) { .pf-project-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pf-project-grid { grid-template-columns: 1fr; } }

        /* Blog grid */
        .pf-blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .pf-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pf-blog-grid { grid-template-columns: 1fr; } }

        /* Animations */
        @keyframes pf-fade-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pf-zoom-in { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }

        .pf-animate-up { animation: pf-fade-up .7s ease both; }
        .pf-animate-zoom { animation: pf-zoom-in .6s ease both; }

        /* small utilities */
        .pf-center { display:flex; justify-content:center; align-items:center; }
      `}</style>

      {/* HERO */}

      {/* ABOUT */}
  

      {/* SERVICES */}
      <section style={{ backgroundColor: ServicesBg, padding: "40px 0" }}>
        <div style={{ width: px(width) + "%", margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}` }} className="pf-container">
          <h2 style={{ textAlign: "center", fontSize: px(ServicesTitleSize), color: ServicesTitleColor, fontWeight: 700, marginBottom: 30 }} className="pf-animate-up">
            {ServicesTitle}
          </h2>

          <div className="pf-services-grid">
            {/* Card 1 */}
            <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", transition: "transform .35s" }} className="pf-animate-zoom" onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.01)") } onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)") }>
              <div style={{ fontSize: px(ServicesTitleSize), marginBottom: 16, color: "#e0b36c" }}>
                <Building2 style={{ width: 34, height: 34 }} />
              </div>
              <h3 style={{ fontSize: px(SerTitleSize), fontWeight: 700, paddingBottom: 8 }}>URBAN DESIGN</h3>
              <p style={{ fontSize: px(ServicesContentSize), lineHeight: 1.6 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", transition: "transform .35s" }} className="pf-animate-zoom" onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.01)") } onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)") }>
              <div style={{ fontSize: px(ServicesTitleSize), marginBottom: 16, color: "#e0b36c" }}>
                <LayoutGrid style={{ width: 34, height: 34 }} />
              </div>
              <h3 style={{ fontSize: px(SerTitleSize), fontWeight: 700, paddingBottom: 8 }}>ARCHITECTURE</h3>
              <p style={{ fontSize: px(ServicesContentSize), lineHeight: 1.6 }}>
                Our architecture team creates meaningful, inspiring spaces that connect communities.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", transition: "transform .35s" }} className="pf-animate-zoom" onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.01)") } onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)") }>
              <div style={{ fontSize: px(ServicesTitleSize), marginBottom: 16, color: "#e0b36c" }}>
                <LuHouse style={{ fontSize: 34 }} />
              </div>
              <h3 style={{ fontSize: px(SerTitleSize), fontWeight: 700, paddingBottom: 8 }}>INTERIOR</h3>
              <p style={{ fontSize: px(ServicesContentSize), lineHeight: 1.6 }}>
                We design beautiful and functional interiors that reflect our clients' unique personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ background: ProjectBackground, padding: "60px 0" }}>
        <div style={{ width: px(width) + "%", margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}` }} className="pf-container">
          <h2 style={{ fontSize: ProjectTitleSize, color: ProjectTitleColor, letterSpacing: "5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 24, textAlign: "center" }} className="pf-animate-up">
            {ProjectTitle}
          </h2>

          {/* filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginBottom: 30 }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  paddingBottom: 6,
                  fontSize: 16,
                  color: active === filter ? ProjectFilterActiveColor : ProjectFilterColor,
                  borderBottom: active === filter ? `2px solid ${ProjectFilterActiveColor}` : "2px solid transparent",
                  transition: "all .25s",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="pf-project-grid">
            {filtered.map((item, idx) => (
              <div key={idx} style={{ position: "relative", overflow: "hidden", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", transition: "transform .35s" }} onMouseEnter={(e)=> e.currentTarget.style.transform = 'translateY(-6px)'} onMouseLeave={(e)=> e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />

                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.6) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 18 }}>
                  <span style={{ fontSize: ProjectCardCategorySize, color: ProjectCardCategoryColor, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>{item.category}</span>
                  <h3 style={{ fontSize: ProjectCardTitleSize, color: ProjectCardTitleColor, fontWeight: 600 }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section style={{ backgroundColor: ServicesBg, padding: "40px 0" }}>
        <div style={{ width: px(width) + "%", margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}` }} className="pf-container">
          <h2 style={{ textAlign: "center", fontSize: px(ServicesTitleSize), color: ServicesTitleColor, fontWeight: 700, marginBottom: 30 }} className="pf-animate-up">Blog</h2>

          <div className="pf-blog-grid">
            {[1,2,3].map((n)=> (
              <article key={n} style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column" }} className="pf-animate-zoom">
                <img src="https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop" alt="blog" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                <div style={{ padding: 18 }}>
                  <h4 style={{ fontSize: px(BlogTitleSize), color: BlogTitleColor, margin: "6px 0"}}>Design for 'The Vertex' Tower Unveiled in Mumbai</h4>
                  <p style={{ margin: "8px 0", lineHeight: 1.5 }}>Our ambitious new 50-story mixed-use tower aims to redefine the city skyline with its innovative sustainable facade and public sky-gardens.</p>
                  <div style={{ color: "#666", marginTop: 8 }}>November 12, 2025</div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button style={{ backgroundColor: "#debb70", padding: "12px 30px", fontSize: 16, fontWeight: 600, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>See All Blog</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#fff", padding: "28px 0" }}>
        <div style={{ width: px(width) + "%", margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}` }} className="pf-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div>
              <strong>Company Name</strong>
              <div style={{ color: "#bbb", marginTop: 6 }}>Making cities better, one building at a time.</div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>Terms</a>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#777", marginTop: 18 }}>© {new Date().getFullYear()} Company Name. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioFull;


