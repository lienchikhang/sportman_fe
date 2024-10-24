'use client';
import React, { useCallback } from 'react';
import '../libs/styles/ProductSearchSection.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductList from './ProductList';
import AppliedFilters from './AppliedFilters';
import SortFilter from './SortFilter';
import SearchResult from './SearchResult';
import ProductSearchBreadcrumb from './ProductSearchBreadcrumb';
import MenuFilter from './MenuFilter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductSearchSection = () => {

    const route = useRouter();
    const search = useSearchParams();
    const path = usePathname();

    const notify = (mess: string, isSuccess: boolean) => {
        console.log('running in  notifunc')
        if (isSuccess) {
            toast.success(mess)
        } else {
            toast.error(mess)
        }
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className='productSearch__wrapper'>
                <div className="productSearch__breadcrumbs">
                    <ProductSearchBreadcrumb />
                </div>
                <div className="productSearch__content">
                    <div className="productSearch__filters">
                        <MenuFilter />
                    </div>
                    <div className='productSearch__info'>
                        <div className="productSearch__heading">
                            <div className='heading__left'>
                                <SearchResult nameFilter={search.get('name')} />
                            </div>
                            <div className="heading__right">
                                <SortFilter />
                            </div>
                        </div>
                        <div className="productSearch__appliedFilter">
                            <AppliedFilters />
                        </div>
                        <div className="productSearch__products">
                            <ProductList notify={notify} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductSearchSection