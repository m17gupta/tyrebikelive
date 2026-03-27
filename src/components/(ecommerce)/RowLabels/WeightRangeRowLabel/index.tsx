"use client";

export const WeightRangeRowLabel = ({ weightFrom, weightTo }: { weightFrom?: number; weightTo?: number }) => {
  return (
    <p>
      {weightFrom ?? ""}
      {(weightFrom !== undefined || weightFrom === 0) && weightTo !== undefined && " - "}
      {weightTo ?? ""}
    </p>
  );
};

