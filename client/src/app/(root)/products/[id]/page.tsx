import ProductDetailInfo from '@/components/ProductDetailInfo';
import React, { CSSProperties } from 'react';
import '../../../../libs/styles/productDetail.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { notFound } from 'next/navigation';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {

    const { id } = params;

    //fetch data
    const data = await fetch(`http://localhost:8080/sportman/products/get-by-id/${id}`, {
        method: 'GET',
    }).then((res) => res.json());

    //fetch similar name products
    const recommendProducts = await fetch(`http://localhost:8080/sportman/products?club=${data?.content?.club}&pageSize=4&sort=desc`, {
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

    if (!data || !recommendProducts) notFound();

    return (
        <div className='productDetail'>
            <div className="productDetail__wrapper">
                <div className="productDetail__images">
                    <div className="background-rotate">
                        <div className="bg-rotate"></div>
                    </div>

                    <div className="list">
                        <div className="item active">
                            <div className="images">
                                <div className="item__img">
                                    <img src={frontImage} alt="" />
                                </div>
                                <div className="item__img"
                                    style={style}
                                >
                                    <img src={backImage} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="menu">
                        <div className='rounded-full bg-red-500 h-[45px] w-[45px]'>
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                </div>
                <div className="productDetail__info">
                    <ProductDetailInfo data={rest} />
                </div>
            </div>
            <div className='productDetail__suggestion'>

            </div>
            <div className="productDetail__comments">

            </div>
        </div>
    )
}

export default ProductDetailPage