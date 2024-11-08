import { IComment } from '@/libs/interfaces/comment.interface';
import { Rating } from '@mui/material';
import React from 'react';
import CommentFilter from './CommentFilter';
import { Divider } from 'antd';
import AvatarCustom from './ui/Avatar';

interface Props {
    data: {
        rates: IComment[],
        currentPage: number,
        totalPage: number,
        totalElements: number,
        sumRate: number
    }
}

const ProductComments: React.FC<Props> = ({ data }) => {

    const { rates, sumRate, totalElements } = data;

    return (
        <div className='productComment__wrapper'>
            <div className="comment__sumRate">
                <div className="sumRate__wrapper">
                    <h2>PRODUCT RATING</h2>
                    <p className='sumRate__number'>{sumRate}</p>
                    <Rating name="read-only" value={sumRate} readOnly />
                    <p className='sumRate__totalRate'>{totalElements} Rates</p>
                </div>
            </div>
            <div id='att' className="comment__side">
                <CommentFilter />
                <Divider />
                <div className="comment__list">
                    {
                        rates.map((rate, idx) => {
                            return <div className='comment__item' key={idx}>
                                <Rating name="read-only" value={rate.rateStar} readOnly />
                                <div className="comment__user">
                                    <AvatarCustom name={rate.user.fullName} url={rate.user.avatar} variant='rounded' />
                                    <h3>{rate.user.fullName}</h3>
                                </div>
                                <p className='comment__content'>{rate.rateComment}</p>
                                <p className='comment__date'>{rate.createdAt}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductComments