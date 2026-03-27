"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type Option = { label: string; value: string };

export const CurrencySelect = ({ value, onChange }: { value?: string; onChange?: (val: string) => void }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<{ availableCurrencies: string[] }>("/api/globals/shopSettings");
        setOptions(
          data.availableCurrencies.map((currency) => ({
            label: currency,
            value: currency,
          })),
        );
      } catch {
        setOptions([]);
      }
    };
    void fetchOptions();
  }, []);

  return (
    <div className="mx-[5px] my-auto flex h-fit flex-1 flex-col gap-[5px]">
      <label htmlFor="currency-select" className="text-sm font-medium">Waluta</label>
      <select
        id="currency-select"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

