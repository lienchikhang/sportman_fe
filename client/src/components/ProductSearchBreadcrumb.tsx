import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';

const ProductSearchBreadcrumb = () => {
    return (
        <Breadcrumb
            separator=">"
            className='text-lg'
            items={[
                {
                    title: 'Home',
                    href: '',
                },
                {
                    title: 'Products',
                    // href: '/products'
                }
            ]}
        />
    )
}

export default ProductSearchBreadcrumb