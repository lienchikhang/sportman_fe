import ProductDetailInfo from '@/components/ProductDetailInfo';
import React, { CSSProperties } from 'react';
import '../../../../libs/styles/productDetail.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { notFound } from 'next/navigation';
import ProductDetailImage from '@/components/ProductDetailImage';
import HeaderProductDetail from '@/components/HeaderProductDetail';
import ProductListSuggestion from '@/components/ProductListSuggestion';


const ProductDetailPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params;

    //fetch data
    const data = await fetch(`http://localhost:8080/sportman/products/get-by-id/${id}`, {
        method: 'GET',
    }).then((res) => res.json());

    //fetch similar name products
    const recommendProducts = await fetch(`http://localhost:8080/sportman/products?club=${data?.content?.club}&pageSize=9&sort=desc`, {
        method: 'GET',
    }).then((res) => res.json());

    //fetch comments
    // const comments = await fetch(`http://localhost:8080/sportman/products/get-by-id/${id}`, {
    //     method: 'GET',
    // }).then((res) => res.json());

    console.log({ data });
    console.log({ recommendProducts })

    const { frontImage, backImage, ...rest } = data?.content;

    const style: CSSProperties & { [key: string]: any } = {
        '--background-rotate': `url(${backImage})`
    };

    if (!data || !recommendProducts) return notFound();

    return (
        <>
            <HeaderProductDetail data={rest} frontImage={frontImage} />
            <div className='productDetail'>
                <div className="productDetail__wrapper">
                    <div className="productDetail__images">
                        <div className="images__wrapper">
                            <div className="background-rotate">
                                <div className="bg-rotate"></div>
                            </div>
                            <div className="list">
                                <div className="item active">
                                    <div className="images">
                                        <div className="item__img">
                                            <img className='image-bg' src={frontImage} alt="" />
                                        </div>
                                        <div className="item__img"
                                            style={style}
                                        >
                                            <img className='image-bg' src={backImage} alt="" />
                                        </div>
                                    </div>
                                    <ProductDetailImage frontImage={frontImage} backImage={backImage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productDetail__info">
                        <ProductDetailInfo data={rest} />
                    </div>
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

            </div>
            <div className="productDetail__watched">

            </div>
        </>
    )
}

export default ProductDetailPage