import DetailContainer from "@/featured/detail-resto/containers/detail-container";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RestaurantPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailContainer id={id} />
    </Suspense>
  );
}
