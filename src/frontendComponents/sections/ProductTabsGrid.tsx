"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeInUp, stagger } from "../anim";
import Link from "next/link";

export type Product = { id: string; name: string; priceEUR: number; image: string; size?: string };
type Category = { id: string; label: string; products: Product[] };

export default function ProductTabsGrid({ categories }: { categories: Category[] }) {
  const first = categories?.[0]?.id ?? "c1";
  return (
    <section className="container mx-auto px-4">
      <Tabs defaultValue={first} className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="text-[16px] font-medium">
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((c) => (
          <TabsContent key={c.id} value={c.id} className="mt-6">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            >
              {c.products.map((p) => (
                <motion.div key={p.id} variants={fadeInUp}>
                  <Link href="/product/knife-1">
                  <Card className="group overflow-hidden">
                    <div className="aspect-[1/1] w-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-3 pb-2">
                      <div className="text- font-semibold">{p.name}</div>
                      {/* {p.size && <div className="text-xs text-black/60 mt-0.5">{p.size}</div>} */}
                    </CardContent>
                    <div className="mx-3 border-b border-[#E6E6E6]" />

                    <CardFooter className="flex items-center justify-between pt-2">
                      <div className="text-[13px] font-semibold text-[var(--brand-orange)]">
                        EUR {p.priceEUR.toFixed(2)}
                      </div>
                      {/* <Button className="h-8 px-4 py-2 text-xs">Add To Bag</Button> */}
                    </CardFooter>
                  </Card>
                  </Link>
                  
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

