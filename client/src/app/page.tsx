import Carousel from "@/components/Carousel";
import ExploreProduct from "@/components/ExploreProduct";
import Showcase from "@/components/Showcase";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Carousel />
      <ExploreProduct />
      <Showcase />
    </div>
  );
}
