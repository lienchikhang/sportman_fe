import React from 'react';
import Product from './Product';
import '../libs/styles/productList.scss';
import { IContent, IData } from '@/libs/interfaces/product.interface';

interface Props {
    // notify: (mess: string, isSuccess: boolean) => void,
    data: IContent,
}

const ProductList: React.FC<Props> = ({ data }) => {

    const { products } = data;

    return (
        <>
            <div className='productList__wrapper'>
                {
                    products.length ? products.map((product, idx) => {
                        return <Product product={product} style='col-span-4 w-full' key={idx} />
                    }) : <div>Oop! There's no product that match your find</div>
                }
            </div>
        </>
    )
}

export default ProductList