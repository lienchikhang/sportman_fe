import React from 'react';
import Carousel from "@/components/Carousel";
import CommentShowcase from "@/components/CommentShowcase";
import ExploreProduct from "@/components/ExploreProduct";
import Showcase from "@/components/Showcase";

const HomePage = () => {
    return (
        <div>
            <Carousel />
            <ExploreProduct />
            <Showcase />
            <CommentShowcase />
        </div>
    )
}

export default HomePage