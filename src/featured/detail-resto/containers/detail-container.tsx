"use client";

import { useRestaurantDetail } from "@/shared/repository/restaurants/query";
import { RestaurantHeader } from "../components/restaurant-header";
import { ReviewCard } from "../components/review-card";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface DetailContainerProps {
  id: string;
}

export default function DetailContainer({ id }: DetailContainerProps) {
  const { data: restaurant, isLoading } = useRestaurantDetail(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          BACK
        </Link>
      </div>

      <RestaurantHeader restaurant={restaurant} />

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <h3 className="text-2xl font-light mb-8 pb-4 border-b border-border">
          {restaurant.reviews.length} Reviews
        </h3>

        <div className="max-w-3xl space-y-2">
          {restaurant.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
