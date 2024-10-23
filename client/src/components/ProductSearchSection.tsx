'use client';
import React from 'react';
import '../libs/styles/ProductSearchSection.scss';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import PriceFilter from './PriceFilter';
import SeasonFilter from './SeasonFilter';
import SizeFilter from './SizeFilter';
import NameFilter from './NameFilter';
import ProductList from './ProductList';


const ProductSearchSection = () => {

    const route = useRouter();
    const search = useSearchParams();
    const path = usePathname();

    return (
        <div className='productSearch__wrapper'>
            <div className="productSearch__heading">
                <h1>
                    Results for <span className='strong'>
                        {search.get('name') ? search.get('name')?.toUpperCase().replaceAll("-", " ") : "ALL"}</span>
                </h1>
                {
                    search.get('name') && <NameFilter />
                }
            </div>
            <div className="productSearch__filters">
                <PriceFilter />
                <SeasonFilter />
                <SizeFilter />
            </div>
            <div className="productSearch__products">
                <ProductList />
            </div>
        </div>
    )
}

export default ProductSearchSection