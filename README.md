# Restaurant Listing App

A restaurant listing application built with Next.js 16, Prisma 6, and Tailwind CSS.

## Tech Stack & Requirements

- **Node.js**: v20 or higher
- **React**: v19.2.3
- **Next.js**: v16.1.6
- **Database**: PostgreSQL
- **Key Libraries**:
  - Prisma ORM
  - TanStack Query
  - Nuqs
  - Shadcn UI + Tailwind CSS v4
  - Framer Motion
  - zustand

## Getting Started

### 1. Installation

Install dependencies using `npm`, `yarn`, or `bun`:

```bash
npm install
# or
yarn install
# or
bun install
```

### 2. Environment Setup

Create a `.env` file in the root directory and add your database connection string and session secret:

```bash
cp .env.example .env
```

### 3. Database Setup

Run the following commands to generate the Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

#### Seeding Data

To populate the database with initial restaurant data:

**Using Bun (Recommended):**
```bash
bun prisma/seed.ts
```

### 4. Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Home Page**:
  - List of restaurants with infinite scroll pagination.
  - Filter by "Open Now", Price Range, and Category.
  - URL-synchronized filters for shareable links.
- **Detail Page**:
  - Detailed view of restaurant information.
  - User reviews with ratings and images.
  - Responsive design.
