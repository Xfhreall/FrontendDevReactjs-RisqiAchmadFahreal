"use server";

import { db } from "@/shared/lib/db";
import type {
  PaginatedResult,
  RestaurantDetail,
  RestaurantListItem,
  RestaurantFilters,
} from "./dto";

const PAGE_SIZE = 8;

export async function getRestaurants(
  page = 1,
  filters?: RestaurantFilters,
): Promise<PaginatedResult<RestaurantListItem>> {
  const { category, price, openNow } = filters || {};

  const where: any = {};

  if (category && category !== "all") {
    where.categories = {
      some: {
        id: category,
      },
    };
  }

  if (price) {
    where.priceRange = price;
  }

  if (openNow) {
    where.isOpenNow = true;
  }

  const [restaurants, total] = await Promise.all([
    db.restaurant.findMany({
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      include: { categories: true },
      orderBy: [{ rating: "desc" }, { id: "asc" }],
    }),
    db.restaurant.count({ where }),
  ]);

  const data: RestaurantListItem[] = restaurants.map((r) => ({
    id: r.id,
    name: r.name,
    image: r.photos[0] || "",
    rating: r.rating,
    priceRange: r.priceRange,
    isOpenNow: r.isOpenNow,
    category: r.categories[0]?.name || "General",
  }));

  const hasMore = page * PAGE_SIZE < total;

  return {
    data,
    hasMore,
    nextCursor: hasMore ? String(page + 1) : undefined,
  };
}

export async function getRestaurantById(
  id: string,
): Promise<RestaurantDetail | null> {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!restaurant) return null;

  return {
    id: restaurant.id,
    name: restaurant.name,
    image: restaurant.photos[0] || "",
    photos: restaurant.photos,
    rating: restaurant.rating,
    priceRange: restaurant.priceRange,
    isOpenNow: restaurant.isOpenNow,
    category: restaurant.categories[0]?.name || "General",
    reviews: restaurant.reviews.map((r) => ({
      id: r.id,
      userName: r.userName,
      userImage: r.userImage,
      rating: r.rating,
      text: r.text,
      image: r.image,
      createdAt: r.createdAt,
    })),
  };
}

export async function getCategories() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories.map((c) => ({ label: c.name, value: c.id }));
}
