"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn/ui/select";
import { Button } from "@/shared/components/shadcn/ui/button";
import { useCategories } from "@/shared/repository/restaurants/query";
import { useRestaurantFilters } from "../hooks/use-restaurant-filters";
import { RadioGroup, RadioGroupItem } from "@/shared/components/shadcn/ui/radio-group";
import { Label } from "@/shared/components/shadcn/ui/label";

export function FilterBar() {
  const {
    openNow,
    setOpenNow,
    price,
    setPrice,
    category,
    setCategory,
    clearAll,
    hasFilters,
  } = useRestaurantFilters();

  const { data: categories } = useCategories();

  return (
    <div className="w-full border-y border-border bg-background py-4">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Filter By:
          </span>

          <div className="flex items-center gap-2 border-r pr-6 mr-2">
            <RadioGroup
              defaultValue={openNow ? "open" : "all"}
              onValueChange={(val) => setOpenNow(val === "open" ? true : null)}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all" className="cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="open" id="r-open" />
                <Label htmlFor="r-open" className="cursor-pointer">Open Now</Label>
              </div>
            </RadioGroup>
          </div>

          <Select
            value={price?.toString()}
            onValueChange={(val) => setPrice(val === "all" ? null : parseInt(val))}
          >
            <SelectTrigger className="w-[100px] border-none shadow-none p-0 h-auto text-muted-foreground hover:text-foreground">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="1">$</SelectItem>
              <SelectItem value="2">$$</SelectItem>
              <SelectItem value="3">$$$</SelectItem>
              <SelectItem value="4">$$$$</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={category || ""}
            onValueChange={(val) => setCategory(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-[140px] border-none shadow-none p-0 h-auto text-muted-foreground hover:text-foreground">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="uppercase text-xs tracking-widest text-muted-foreground border-border"
          onClick={clearAll}
          disabled={!hasFilters}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
