"use client";

export const DeliveryZonesRowLabel = ({ countries }: { countries?: string[] }) => {
  return <p>{countries?.join(", ")}</p>;
};

