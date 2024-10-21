import React from 'react';
import Rating from '@mui/material/Rating';
import { Skeleton } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AvatarCustom from './ui/Avatar';
import '../libs/styles/comment.scss';
import { IComment } from '@/libs/interfaces/comment.interface';
import { convertCommentText } from '@/libs/funcs/textFuncs';

interface Props {
    data: IComment | null,
}

const Comment: React.FC<Props> = ({ data }) => {

    if (!data) {
        return <div className='comment__wrapper'>
            <Skeleton className='comment__date' animation="wave" width={100} />
            <div className="comment__starts">
                <Rating name="read-only" value={5} readOnly />
            </div>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <div className='comment__quote'>
                <FormatQuoteIcon />
            </div>
            <div className='user'>
                <AvatarCustom
                    name='test'
                />
                <div className='user__info'>
                    <Skeleton animation="wave" width={100} />
                    <Skeleton animation="wave" width={100} />
                </div>
            </div>
        </div>
    }

    return (
        <div className='comment__wrapper'>
            <p className='comment__date'>{data.createdAt}</p>
            <div className="comment__starts">
                <Rating name="read-only" value={5} readOnly />
            </div>
            <p className='comment__content'>{convertCommentText(data.rateComment)}</p>
            <div className='comment__quote'>
                <FormatQuoteIcon />
            </div>
            <div className='user'>
                <AvatarCustom
                    name={data.user.fullName}
                    url={data.user.avatar}
                />
                <div className='user__info'>
                    <p className='user__name'>{data.user.fullName}</p>
                    <p className='user__username'>{data.user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;