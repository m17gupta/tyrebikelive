
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type Rec = { id: string; name: string; priceEUR: number; image: string; blurb?: string };
export default function RecommendedList({ items }: { items: Rec[] }) {
  return (
    <section className="container py-0 ">
      <h3 className="mb-8 text-xl font-semibold">Recommended next to this product:</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        {items.map((r) => (
         <Card key={r.id} className="grid grid-cols-2 overflow-hidden">
  {/* Left side - Image */}
  <div className="h-full">
    <img
      src={r.image}
      alt={r.name}
      className="h-full w-full object-cover"
    />
  </div>

  {/* Right side - Content */}
  <div className="flex flex-col justify-between">
    <CardContent>
      <div className="text-xl font-semibold">{r.name}</div>
      {r.blurb && (
        <p className="mt-1 text-base text-black/60">{r.blurb}</p>
      )}
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      <Button className="h-8 px-4 py-5 text-base" style={{ borderRadius: "6px" }}>
        Add To Bag
      </Button>

      <div>
        <div className="text-2xl font-semibold text-[var(--brand-orange)]">
          EUR {r.priceEUR.toFixed(2)}
        </div>
        <p className="text-[11px] text-end italic">25% VAT Included</p>
      </div>
    </CardFooter>
  </div>
</Card>

        ))}
      </div>
    </section>
  );
}

