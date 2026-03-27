"use client";

import { useAuth } from "@/components/AdminAuthProvider";
import { fetchProducts } from "@/redux/slices/products/productsThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function GetAllProducts() {
  const { allProducts, loading, error, hasFetched } = useSelector(
    (state: RootState) => state.products,
  );

  const dispatch = useDispatch<AppDispatch>();

  const user = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!hasFetched && !loading) {
      dispatch(fetchProducts());
    }
  }, [user, hasFetched, loading]);

  return null;
}
