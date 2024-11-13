import ProductDetailInfo from '@/components/ProductDetailInfo';
import React, { CSSProperties } from 'react';
import '../../../../libs/styles/productDetail.scss';
import { notFound } from 'next/navigation';
import ProductDetailImage from '@/components/ProductDetailImage';
import HeaderProductDetail from '@/components/HeaderProductDetail';
import ProductListSuggestion from '@/components/ProductListSuggestion';
import ProductComments from '@/components/ProductComments';
import ProductsWatched from '@/components/ProductsWatched';
import { ChoiceProvider } from '@/libs/contexts/choice.context';
import { CartProvider } from '@/libs/contexts/cart.context';
import CartNotification from '@/components/CartNotification';


const ProductDetailPage = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {

    const { id } = params;
    const { page, pageSize, rate } = searchParams;

    //query comment
    const query = `http://localhost:8080/sportman/rates/${id}?page=${page ? page : 1}&pageSize=${pageSize ? pageSize : 6}${rate ? `&rate=${rate}` : ''}`;

    //fetch data
    const data = await fetch(`http://localhost:8080/sportman/products/get-by-id/${id}`, {
        method: 'GET',
    }).then((res) => res.json());

    //fetch similar name products
    const recommendProducts = await fetch(`http://localhost:8080/sportman/products?club=${data?.content?.club}&pageSize=9&sort=desc`, {
        method: 'GET',
    }).then((res) => res.json());

    //fetch comments
    const comments = await fetch(query, {
        method: 'GET',
    }).then((res) => res.json());

    const { frontImage, backImage, ...rest } = data?.content;

    const style: CSSProperties & { [key: string]: any } = {
        '--background-rotate': `url(${backImage})`
    };

    if (!data || !recommendProducts || !comments) return notFound();

    return (
        <>
            <CartNotification />
            <div className='productDetail'>
                <div className="productDetail__wrapper">
                    <div className="productDetail__images">
                        <ProductDetailImage frontImage={frontImage} backImage={backImage} />
                    </div>
                    <ChoiceProvider>
                        <CartProvider>
                            <HeaderProductDetail data={rest} frontImage={frontImage} />
                            <div className="productDetail__info">
                                <ProductDetailInfo data={data?.content} />
                            </div>
                        </CartProvider>
                    </ChoiceProvider>
                </div>
                <div className="productDetail__detail">
                    <h2 className='detail__heading'>Product Detail</h2>
                    <div className='detail__grid'>
                        <div className='grid__item'>
                            <img src={frontImage} alt="jersey-front-image" />
                            <div className='item__content'>
                                <h2>Color nice</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, perspiciatis?</p>
                            </div>
                        </div>
                        <div className='grid__item'>
                            <img src={backImage} alt="jersey-back-image" />
                            <div className='item__content'>
                                <h2>Color nice</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, perspiciatis?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='productDetail__suggestion'>
                <h1 className='suggest__title'>PRODUCT SUGGESTION</h1>
                <ProductListSuggestion data={recommendProducts?.content} />
            </div>
            <div className="productDetail__comments">
                <ProductComments data={comments?.content} />
            </div>
            <div className="productDetail__watched">
                <h1 className='watched__title'>PRODUCT WHICH YOU HAD WATCH</h1>
                <ProductsWatched />
            </div>
        </>
    )
}

export default ProductDetailPage