import { StarRating } from "@/shared/components/star-rating";
import { StatusBadge } from "@/shared/components/status-badge";
import Image from "next/image";
import type { RestaurantDetail } from "@/shared/repository/restaurants/dto";

interface RestaurantHeaderProps {
  restaurant: RestaurantDetail;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="relative w-full h-[400px] bg-muted overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-2">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          {restaurant.name}
        </h1>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <StarRating rating={restaurant.rating} className="size-16" />
            <span className="text-lg font-medium">{restaurant.rating}</span>
            <span className="text-muted-foreground text-sm">({restaurant.reviews.length} reviews)</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-wide">
            <span>{restaurant.category}</span>
            <span>•</span>
            <span>{`price: ${"$".repeat(restaurant.priceRange)}`}</span>
            <StatusBadge isOpen={restaurant.isOpenNow} />
          </div>
        </div>

        <p className="max-w-3xl text-muted-foreground text-justify leading-relaxed pt-4">
          Deskripsi detail restoran akan ditampilkan di sini. Sementara masih pakai placeholder.{" "}
          {restaurant.name} menyajikan makanan {restaurant.category} terbaik di kota ini.
          Nikmati pengalaman bersantap yang luar biasa bersama kami.
        </p>
      </div>
    </div>
  );
}
