"use client";

import { FilterBar } from "../components/filter-bar";
import { RestaurantGrid } from "../components/restaurant-grid";

export default function HomeContainer() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 md:px-8 py-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
          Restaurants
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>
      <FilterBar />
      <main className="container mx-auto px-4 md:px-8 bg-background">
        <RestaurantGrid />
      </main>
    </div>
  );
}
