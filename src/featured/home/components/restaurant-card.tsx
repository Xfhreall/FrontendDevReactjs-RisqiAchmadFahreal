"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/shared/components/shadcn/ui/card";
import { Button } from "@/shared/components/shadcn/ui/button";
import { StarRating } from "@/shared/components/star-rating";
import { StatusBadge } from "@/shared/components/status-badge";
import type { RestaurantListItem } from "@/shared/repository/restaurants/dto";

interface RestaurantCardProps {
  restaurant: RestaurantListItem;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-none shadow-none bg-transparent">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-0 space-y-3">
          <h3 className="font-sans text-lg font-medium leading-tight text-foreground line-clamp-2">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-2">
            <StarRating rating={restaurant.rating} />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
            <div className="flex items-center gap-1">
              <span>{restaurant.category}</span>
              <span>•</span>
              <span>{"$".repeat(restaurant.priceRange)}</span>
            </div>
            <StatusBadge isOpen={restaurant.isOpenNow} />
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <Button asChild className="w-full bg-[#002B56] hover:bg-[#001A33] text-white rounded-none uppercase tracking-widest text-xs h-10 font-medium">
            <Link href={`/restaurant/${restaurant.id}`}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
