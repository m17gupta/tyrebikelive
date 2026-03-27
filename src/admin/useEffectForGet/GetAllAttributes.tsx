"use client";

import { useAuth } from "@/components/AdminAuthProvider";
import { fetchAttributes } from "@/redux/slices/attributes/attributesThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export default function GetAllAttributes() {
  const { allattributes, attributeLoading, attributeError } = useSelector(
    (state: RootState) => state.attributes,
  );

  const dispatch = useDispatch<AppDispatch>();

  const user = useAuth();


  useEffect(() => {
    if (!user) return;

    if (allattributes.length === 0 && !attributeLoading) {
      dispatch(fetchAttributes());
    }
  }, [user, allattributes.length, attributeLoading]);

  return null;
}
