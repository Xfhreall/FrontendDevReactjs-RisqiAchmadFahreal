"use client";

import { useSearchParams } from "next/navigation";
import { useRestaurants } from "@/shared/repository/restaurants/query";

export function useRestaurantGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const priceParam = searchParams.get("price");
  const price = priceParam ? Number(priceParam) : undefined;
  const openNow = searchParams.get("openNow") === "true";

  const filters = {
    category,
    price,
    openNow,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useRestaurants(filters);

  const restaurants = data?.pages.flatMap((page) => page.data) || [];

  return {
    restaurants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
