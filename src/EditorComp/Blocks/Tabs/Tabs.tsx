"use client";

import { ComponentConfig } from "@measured/puck";

export const TabsBlock: ComponentConfig = {
  label: "Tabs",

  // --------------------------------------------
  // FIELDS
  // --------------------------------------------
  fields: {
    sectionTitle: { type: "text", label: "Section Title" },
    sectionDesc: { type: "textarea", label: "Section Description" },

    categories: {
      type: "array",
      label: "Categories",
      arrayFields: {
        id: { type: "text", label: "Category ID" },
        label: { type: "text", label: "Category Name" },

        products: {
          type: "array",
          label: "Products",
          arrayFields: {
            id: { type: "text", label: "Product ID" },
            name: { type: "text", label: "Product Name" },
            priceEUR: { type: "number", label: "Price (EUR)" },
            image: { type: "text", label: "Image URL" },
            size: { type: "text", label: "Size" },
          },
        },
      },
    },
  },

  // --------------------------------------------
  // DEFAULT PROPS
  // --------------------------------------------
  defaultProps: {
    sectionTitle: "Naši kuharski noževi",
    sectionDesc:
      "Otkrijte kolekciju ručno kovanih noževa stvorenih za kuhare koji traže više od alata. Svaki model spaja preciznost, dugotrajnost i ljepotu rada iz majstorskih ruku.",

    categories: [
      {
        id: "petty",
        label: "Petty",
        products: Array(8).fill({
          id: "p1",
          name: "Petty 173mm",
          priceEUR: 220,
          image: "/assets/products/product-img.png",
          size: "173mm",
        }),
      },
      {
        id: "gyuto",
        label: "Gyuto",
        products: Array(6).fill({
          id: "p2",
          name: "Gyuto 210mm",
          priceEUR: 260,
          image: "/assets/products/product-img.png",
          size: "210mm",
        }),
      },
      {
        id: "santoku",
        label: "Santoku",
        products: Array(6).fill({
          id: "p3",
          name: "Santoku 180mm",
          priceEUR: 240,
          image: "/assets/products/product-img.png",
          size: "180mm",
        }),
      },
      {
        id: "nakiri",
        label: "Nakiri",
        products: Array(6).fill({
          id: "p4",
          name: "Nakiri 165mm",
          priceEUR: 230,
          image: "/assets/products/product-img.png",
          size: "165mm",
        }),
      },
    ],
  },

  // --------------------------------------------
  // RENDER
  // --------------------------------------------
  render: ({ sectionTitle, sectionDesc, categories }) => {
    const first = categories?.[0]?.id ?? "cat1";

    return (
      <section style={{ width: "100%", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          {/* SECTION HEADINGS */}
          <h3
            style={{
              color: "#FF7020",
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "15px",
              width: "100%",
              display: "block",
            }}
          >
            {sectionTitle}
          </h3>

          <p
            style={{
              color: "#4F4640",
              fontSize: "26px",
              maxWidth: "900px",
              lineHeight: "160%",
              marginBottom: "40px",
              fontWeight: "500",
            }}
          >
            {sectionDesc}
          </p>

          {/* CATEGORY TABS */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => (window.location.hash = c.id)}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontWeight: 500,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          {categories.map((c) => (
            <div
              id={c.id}
              key={c.id}
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {c.products.map((p, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.3s",
                      }}
                    />
                  </div>

                  <div style={{ padding: "15px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: 600 }}>{p.name}</h4>
                    <p style={{ fontSize: "13px", opacity: 0.6 }}>{p.size}</p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #eee",
                      padding: "12px 15px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#FF7020" }}>
                      EUR {p.priceEUR}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  },
};

