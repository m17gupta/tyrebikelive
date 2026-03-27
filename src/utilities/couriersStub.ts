
import { type Locale } from "@/i18n/config";

/**
 * Simple stub for couriers configuration.
 */
export const getCouriersArray = async (locale: Locale, isTopLevel: boolean = false) => {
  return [
    {
      slug: "inpost-locker",
      title: "InPost Paczkomat",
      turnaround: "1-2 days",
      icon: null,
      deliveryZones: [
        {
          countries: ["PL"],
          range: [
            {
              weightFrom: 0,
              weightTo: 25,
              pricing: [
                { currency: "PLN", value: 15 },
                { currency: "EUR", value: 4 },
              ],
            },
          ],
          freeShipping: [
            { currency: "PLN", value: 200 },
            { currency: "EUR", value: 50 },
          ],
        },
      ],
    },
    {
      slug: "inpost-courier",
      title: "InPost Kurier",
      turnaround: "1-2 days",
      icon: null,
      deliveryZones: [
        {
          countries: ["PL"],
          range: [
            {
              weightFrom: 0,
              weightTo: 30,
              pricing: [
                { currency: "PLN", value: 20 },
                { currency: "EUR", value: 5 },
              ],
            },
          ],
          freeShipping: [
            { currency: "PLN", value: 300 },
            { currency: "EUR", value: 75 },
          ],
        },
      ],
    },
  ];
};

export const createCouriers = async (locale: Locale) => {
  const couriers = await getCouriersArray(locale);
  return couriers.map(c => ({
    ...c,
    key: c.slug,
    prepaid: true,
    getSettings: async () => ({
      deliveryZones: c.deliveryZones,
      settings: { label: c.title }
    }),
    createPackage: async (order: any, dimension: any, dimensions: any) => {
      console.log(`Stub: Creating package for courier ${c.slug}`);
      return `pkg-${Math.random().toString(36).substr(2, 9)}`;
    }
  }));
};
