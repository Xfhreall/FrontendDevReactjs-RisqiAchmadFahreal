import HomeContainer from "@/featured/home/containers/home-container";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContainer />
    </Suspense>
  );
}
