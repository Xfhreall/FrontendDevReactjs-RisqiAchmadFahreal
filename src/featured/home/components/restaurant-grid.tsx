"use client";

import { RestaurantCard } from "./restaurant-card";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { useRestaurantGrid } from "../hooks/use-restaurant-grid";

export function RestaurantGrid() {
  const {
    restaurants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useRestaurantGrid();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 py-8">
        {[...Array(8)].map((_, i) => (
          <div key={`skeleton-${i.toString()}`} className="flex flex-col h-full space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No restaurants found with the selected filters.
      </div>
    );
  }

  return (
    <div className="py-8 space-y-12">
      <h2 className="text-2xl font-light tracking-wide text-foreground">
        All Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full md:w-[400px] uppercase tracking-widest text-xs h-12 border-border"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : hasNextPage ? "LOAD MORE" : "NO MORE RESTAURANTS"}
        </Button>
      </div>
    </div>
  );
}
