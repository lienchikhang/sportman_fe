import Carousel from "@/components/Carousel";
import CommentShowcase from "@/components/CommentShowcase";
import ExploreProduct from "@/components/ExploreProduct";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <div>
      <Carousel />
      <ExploreProduct />
      <Showcase />
      <CommentShowcase />
    </div>
  );
}
