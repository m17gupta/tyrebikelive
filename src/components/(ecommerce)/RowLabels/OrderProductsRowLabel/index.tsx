"use client";

export const OrderProductsRowLabel = ({
  productName,
  color,
  size,
  quantity,
}: {
  productName?: string;
  color?: string;
  size?: string;
  quantity?: number;
}) => {
  const label = [productName, color, size].filter(Boolean).join(", ");
  return (
    <p>
      {label} x {quantity ?? 1}
    </p>
  );
};

