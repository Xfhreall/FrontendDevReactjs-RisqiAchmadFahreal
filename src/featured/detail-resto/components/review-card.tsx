import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/shadcn/ui/avatar";
import { StarRating } from "@/shared/components/star-rating";
import type { ReviewItem } from "@/shared/repository/restaurants/dto";
import Image from "next/image";

interface ReviewCardProps {
  review: ReviewItem;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-6 border-b border-border last:border-0">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={review.userImage} alt={review.userName} />
          <AvatarFallback>{review.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1">
          <h4 className="font-semibold text-sm">{review.userName}</h4>
          <StarRating rating={review.rating} className="gap-0.5" />
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {review.text}
          </p>
          {review.image && (
            <div className="mt-3 relative h-40 w-40 rounded-md overflow-hidden bg-muted">
              <Image
                src={review.image}
                alt="Review attachment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
