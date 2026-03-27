"use client";

export const PriceRowLabel = ({ currency, value }: { currency?: string; value?: string }) => {
  return (
    <p>
      {value} {currency}
    </p>
  );
};

