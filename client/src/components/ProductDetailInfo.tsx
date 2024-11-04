import React from 'react'
import ProductDetailOrder from './ProductDetailOrder';

interface Props {
    data: {
        id: string,
        productName: string,
        productPrice: number,
        // frontImage: string,
        // backImage: string,
        colors: any[],
        stocks: {
            sizeTag: string,
            stocks: number,
        }[],
        seasons: any[],
    }
}

const ProductDetailInfo: React.FC<Props> = ({ data }) => {

    const { id, productName, productPrice, colors, stocks, seasons } = data;

    return (
        <>
            <h1 className='productDetail__name'>{productName.replaceAll('-', ' ')}</h1>
            <p className='productDetail__price'>{new Intl.NumberFormat('en-US').format(productPrice)} VND</p>
            <div className='productDetail__season'>
                <p>Season:</p>
                <p>{seasons.join("-")}</p>
            </div>
            <div className='productDetail__color'>
                <p>Colors:</p>
                <div className='color__list'>
                    {colors.map((color, idx) => {
                        return <div key={idx} style={{ backgroundColor: `${color}` }}>
                        </div>
                    })}
                </div>
            </div>
            <ProductDetailOrder data={data} />
        </>
    )
}

export default ProductDetailInfo