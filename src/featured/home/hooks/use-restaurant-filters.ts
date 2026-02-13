"use client";

import { useQueryState, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs";

export function useRestaurantFilters() {
  const [openNow, setOpenNow] = useQueryState("openNow", parseAsBoolean);
  const [price, setPrice] = useQueryState("price", parseAsInteger);
  const [category, setCategory] = useQueryState("category", parseAsString);

  const clearAll = () => {
    setOpenNow(null);
    setPrice(null);
    setCategory(null);
  };

  const hasFilters = !!openNow || !!price || !!category;

  return {
    openNow,
    setOpenNow,
    price,
    setPrice,
    category,
    setCategory,
    clearAll,
    hasFilters,
  };
}
