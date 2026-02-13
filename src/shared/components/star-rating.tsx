import { Star, StarHalf } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}-${rating}`}
          className="w-4 h-4 fill-primary text-primary"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-primary text-primary" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}-${rating}`}
          className="w-4 h-4 text-muted-foreground"
        />
      ))}
    </div>
  );
}
