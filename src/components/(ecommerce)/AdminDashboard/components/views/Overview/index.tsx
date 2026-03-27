"use client";
import { useTranslations } from "next-intl";
import axios from "axios";
import { subDays, format } from "date-fns";
import { ClipboardPaste, DollarSign } from "lucide-react";
import { animate } from "motion/react";
import { useSearchParams } from "next/navigation";
import {
  type SetStateAction,
  type Dispatch,
  useEffect,
  useState,
  useCallback,
  useRef,
  type RefObject,
} from "react";

import { OverviewCard } from "../../OverviewCard";
import { OverviewChart } from "../../OverviewChart";
import { OverviewLastOrders } from "../../OverviewLastOrders";

type Currency = string;

const formatPrice = (amount: number, currency: Currency, locale: string = "en-US") => {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

export const Overview = () => {
  const [totalRevenue, setTotalRevenue] = useState<{ value: number; percentage: number }>({
    value: 0,
    percentage: 0,
  });
  const [totalOrders, setTotalOrders] = useState<{ value: number; percentage: number }>({
    value: 0,
    percentage: 0,
  });
  const [rangedRevenue, setRangedRevenue] = useState<{ value: number; percentage: number }>({
    value: 0,
    percentage: 0,
  });
  const [rangedOrders, setRangedOrders] = useState<{ value: number; percentage: number }>({
    value: 0,
    percentage: 0,
  });

  const [currency, setCurrency] = useState<Currency | null>(null);
  const t = useTranslations("adminDashboard");
  const locale = "en-US";

  const searchParams = useSearchParams();
  const dateFrom = searchParams.get("from") ?? format(subDays(new Date(), 30), "yyyy-MM-dd");
  const dateTo = searchParams.get("to") ?? format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const { data } = await axios.get<{ availableCurrencies: string[] }>("/api/globals/shopSettings", {
          withCredentials: true,
        });
        setCurrency(data.availableCurrencies?.[0] ?? "USD");
      } catch {
        setCurrency("USD");
      }
    };
    void fetchCurrency();
  }, []);

  const totalRevenueRef = useRef(totalRevenue.value);
  const rangedRevenueRef = useRef(rangedRevenue.value);
  const totalOrdersRef = useRef(totalOrders.value);
  const rangedOrdersRef = useRef(rangedOrders.value);

  const fetchRevenue = useCallback(
    async (
      currentRef: RefObject<number>,
      setRevenue: Dispatch<SetStateAction<{ value: number; percentage: number }>>,
      requestData?: { dateFrom?: string; dateTo?: string },
    ) => {
      const { data } = await axios.post<{ totalRevenue: number; percentage: number }>(
        "/api/orders/revenue",
        requestData ?? {},
        { withCredentials: true },
      );
      const valueAnimation = animate(currentRef.current, data.totalRevenue, {
        duration: 1,
        onUpdate: (value) => {
          currentRef.current = Math.round(value);
          setRevenue((prev) => ({ ...prev, value: currentRef.current }));
        },
      });
      const percentageAnimation = animate(0, data.percentage, {
        duration: 1,
        onUpdate: (value) => {
          setRevenue((prev) => ({ ...prev, percentage: Number(value.toFixed(1)) }));
        },
      });
      return () => { valueAnimation.stop(); percentageAnimation.stop(); };
    },
    [],
  );

  const fetchOrderCount = useCallback(
    async (
      currentRef: RefObject<number>,
      setOrders: Dispatch<SetStateAction<{ value: number; percentage: number }>>,
      requestData?: { dateFrom?: string; dateTo?: string },
    ) => {
      const { data } = await axios.post<{ total: number; percentage: number }>(
        "/api/orders/count",
        requestData ?? {},
        { withCredentials: true },
      );
      const valueAnimation = animate(currentRef.current, data.total, {
        duration: 1,
        onUpdate: (value) => {
          currentRef.current = Math.round(value);
          setOrders((prev) => ({ ...prev, value: currentRef.current }));
        },
      });
      const percentageAnimation = animate(0, data.percentage, {
        duration: 1,
        onUpdate: (value) => {
          setOrders((prev) => ({ ...prev, percentage: Number(value.toFixed(1)) }));
        },
      });
      return () => { valueAnimation.stop(); percentageAnimation.stop(); };
    },
    [],
  );

  useEffect(() => { void fetchRevenue(totalRevenueRef, setTotalRevenue); }, [fetchRevenue]);
  useEffect(() => { void fetchRevenue(rangedRevenueRef, setRangedRevenue, { dateFrom, dateTo }); }, [dateFrom, dateTo, fetchRevenue]);
  useEffect(() => { void fetchOrderCount(totalOrdersRef, setTotalOrders); }, [fetchOrderCount]);
  useEffect(() => { void fetchOrderCount(rangedOrdersRef, setRangedOrders, { dateFrom, dateTo }); }, [dateFrom, dateTo, fetchOrderCount]);

  return (
    <section className="flex flex-col gap-6">
      <div className="twp grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label={t("totalRevenue")}
          icon={<DollarSign className="h-5 w-5 text-payload-elevation-900 opacity-75" />}
          value={currency ? formatPrice(totalRevenue.value, currency, locale) : totalRevenue.value}
          percentage={totalRevenue.percentage}
        />
        <OverviewCard
          label={t("totalOrders")}
          icon={<ClipboardPaste className="h-5 w-5 text-payload-elevation-900 opacity-75" />}
          value={totalOrders.value}
          percentage={totalOrders.percentage}
        />
        <OverviewCard
          label={t("rangedRevenue")}
          icon={<DollarSign className="h-5 w-5 text-payload-elevation-900 opacity-75" />}
          value={currency ? formatPrice(rangedRevenue.value, currency, locale) : rangedRevenue.value}
          percentage={rangedRevenue.percentage}
        />
        <OverviewCard
          label={t("rangedOrders")}
          icon={<ClipboardPaste className="h-5 w-5 text-payload-elevation-900 opacity-75" />}
          value={rangedOrders.value}
          percentage={rangedOrders.percentage}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
        <OverviewChart />
        <OverviewLastOrders />
      </div>
    </section>
  );
};

