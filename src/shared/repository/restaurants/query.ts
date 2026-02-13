import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getRestaurantById,
  getRestaurants,
} from "./action";
import type { RestaurantFilters } from "./dto";

export function useRestaurants(filters: RestaurantFilters) {
  return useInfiniteQuery({
    queryKey: ["restaurants", filters],
    queryFn: ({ pageParam = 1 }) => getRestaurants(pageParam as number, filters),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? Number(lastPage.nextCursor) : undefined,
    initialPageParam: 1,
  });
}

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
