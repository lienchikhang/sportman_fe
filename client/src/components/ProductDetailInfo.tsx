import React from 'react'
import ProductDetailOrder from './ProductDetailOrder';
import RestoreIcon from '@mui/icons-material/Restore';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface Props {
    data: {
        id: string,
        productName: string,
        productPrice: number,
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
                        return <div key={idx} style={{ backgroundColor: `${color}`, borderColor: `${color}` }}>
                        </div>
                    })}
                </div>
            </div>
            <ProductDetailOrder data={data} />
            <div className='product__notes'>
                <div className='note__item'>
                    <RestoreIcon />
                    <span>Easily restore only with phone</span>
                </div>
                <div className='note__item'>
                    <CallIcon />
                    <span>Easily restore only with phone</span>
                </div>
                <div className='note__item'>
                    <PlaceIcon />
                    <span>Easily restore only with phone</span>
                </div>
                <div className='note__item'>
                    <AddReactionIcon />
                    <span>Easily restore only with phone</span>
                </div>
            </div>
            <Divider />
            <div className='product__specfication'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Specifications
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>
                                <RemoveIcon />
                                <p>Chất liệu: 97% Poly + 3% Spandex</p>
                            </li>
                            <li>
                                <RemoveIcon />
                                <p>Xử lý hoàn thiện vải: Quick-Dry + Wicking + Stretch</p>
                            </li>
                            <li>
                                <RemoveIcon />
                                <p>Công nghệ Chafe-Free hạn chế tối đa ma sát trong quá trình vận động từ các đường may tối giản hoá</p>
                            </li>
                            <li>
                                <RemoveIcon />
                                <p>Sản phẩm được đánh giá phù hợp với hoạt động chạy bộ bởi các Runner chuyên nghiệp
                                </p>
                            </li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

export default ProductDetailInfo