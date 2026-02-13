export type RestaurantListItem = {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceRange: number;
  isOpenNow: boolean;
  category: string;
};

export type ReviewItem = {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  text: string;
  image?: string | null;
  createdAt: Date;
};

export type RestaurantDetail = RestaurantListItem & {
  reviews: ReviewItem[];
  photos: string[];
};

export type RestaurantFilters = {
  openNow?: boolean;
  price?: number;
  category?: string;
  search?: string;
};

export type PaginatedResult<T> = {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
};
