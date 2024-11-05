import React from 'react';
import Carousel from "@/components/Carousel";
import CommentShowcase from "@/components/CommentShowcase";
import ExploreProduct from "@/components/ExploreProduct";
import Showcase from "@/components/Showcase";
import PremierLeagueShowcase from '@/components/PremierLeagueShowcase';
import BundesligaShowcase from '@/components/BundesligaLeagueShowcase';
import LaligaShowcase from '@/components/LaligaShowcase';

const HomePage = () => {
    return (
        <>
            <Carousel />
            <Showcase />
            <PremierLeagueShowcase />
            <LaligaShowcase />
            <BundesligaShowcase />
            <CommentShowcase />
        </>
    )
}

export default HomePage