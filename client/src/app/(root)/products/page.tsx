import React from 'react'
import AppliedFilters from '@/components/AppliedFilters';
import MenuFilter from '@/components/MenuFilter';
import ProductList from '@/components/ProductList';
import ProductSearchBreadcrumb from '@/components/ProductSearchBreadcrumb';
import SearchResult from '@/components/SearchResult';
import SortFilter from '@/components/SortFilter';
import '../../../libs/styles/ProductSearchSection.scss';
import { notFound } from 'next/navigation';
import { IData } from '@/libs/interfaces/product.interface';
import ProductPagination from '@/components/ProductPagination';
import ProductSearchCarousel from '@/components/ProductSearchCarousel';
import { Divider } from '@mui/material';


const ProductPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {

    const { page, pageSize, sort, price, season, size, name, club, league } = searchParams;

    const query = `http://localhost:8080/sportman/products?page=${page}&pageSize=${pageSize}${sort ? `&sort=${sort}` : ''}${name ? `&name=${name}` : ''}${club ? `&club=${club}` : ''}${season ? `&season=${season}` : ''}${price ? `&price=${price}` : ''}${size ? `&size=${size}` : ''}${league ? `&league=${league}` : ''}`

    const data = await fetch(query,
        {
            method: 'GET',
        }).then((res) => res.json()) as IData;

    if (!data) return notFound();

    const { content } = data;

    return (
        <>
            <div className='productSearch__carousel'>
                <ProductSearchCarousel type={league} />
            </div>
            <div className='productSearch__wrapper'>
                <div id='att' className="productSearch__breadcrumbs">
                    <ProductSearchBreadcrumb />
                </div>
                <div className="productSearch__content">
                    <div className="productSearch__filters">
                        <MenuFilter />
                    </div>
                    <div className='productSearch__info'>
                        <div className="productSearch__heading">
                            <SearchResult nameFilter={name} />
                        </div>
                        <Divider />
                        <div className="productSearch__appliedFilter">
                            <AppliedFilters totalResult={content?.totalElements} />
                            <SortFilter />
                        </div>
                        <div className="productSearch__products">
                            <ProductList data={content} />
                            <ProductPagination currentPage={content?.currentPage} totalPage={content?.totalPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage;