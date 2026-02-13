import { db as prisma } from "../src/shared/lib/db";

const CATEGORIES = [
  "Italian",
  "Japanese",
  "Mexican",
  "Seafood",
  "Steakhouse",
  "American",
  "Thai",
  "Burger",
];

const RESTAURANT_NAMES = [
  "The Golden Spoon",
  "Ocean Blue",
  "Spicy Dragon",
  "Pasta Palace",
  "Burger King (Not that one)",
  "Sushi World",
  "Taco Fiesta",
  "Steakhouse 99",
  "Pizza Paradise",
  "Curry House",
  "Noodle Bar",
  "BBQ Heaven",
  "Salad Stop",
  "Vegan Delight",
  "Seafood Shack",
  "Grill Master",
  "Wok & Roll",
  "Tapas Time",
  "Dim Sum House",
  "Fusion Bistro",
];

async function main() {
  console.log("Seeding database...");

  await prisma.review.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.category.deleteMany();

  const categoryMap = new Map();
  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({
      data: { name: cat },
    });
    categoryMap.set(cat, created.id);
  }

  for (const name of RESTAURANT_NAMES) {
    const categoryName =
      CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const categoryId = categoryMap.get(categoryName);
    const priceRange = Math.floor(Math.random() * 4) + 1;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const isOpenNow = Math.random() > 0.3;

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        priceRange,
        rating: parseFloat(rating),
        isOpenNow,
        photos: [
          `https://loremflickr.com/500/500/food,restaurant?random=${Math.random()}`,
          `https://loremflickr.com/500/500/dish?random=${Math.random()}`,
          `https://loremflickr.com/500/500/cooking?random=${Math.random()}`,
        ],
        categories: {
          connect: { id: categoryId },
        },
      },
    });

    const reviewCount = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < reviewCount; i++) {
      await prisma.review.create({
        data: {
          restaurantId: restaurant.id,
          userName: `User ${Math.floor(Math.random() * 1000)}`,
          userImage: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000)}`,
          rating: Math.floor(Math.random() * 5) + 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: `https://loremflickr.com/500/500/food,dish?random=${Math.random()}`,
        }
      })
    }
  }

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
