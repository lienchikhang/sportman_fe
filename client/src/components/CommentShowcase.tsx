'use client';
import React, { useEffect, useState } from 'react';
import '../libs/styles/commentShowcase.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Error } from './ui';
import Comment from './Comment';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import http from '@/libs/configs/http';

// import './styles.css';

const CommentShowcase = () => {

    const [comments, setComments] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [totalComment, setTotalComment] = useState(4);

    useEffect(() => {
        http.get("/rates?pageSize=25")
            .then((res) => {
                console.log(res.data);
                if (res?.status != 200) { setError(true); return; }
                setComments(res?.data?.content?.rates);
                setLoading(false);
                setTotalComment(res?.data.totalElements);
            })
            .catch((err) => { setLoading(false); setError(true); })
    }, []);

    if (hasError) {
        return <div className="commentShowcase__background">
            <div className='commentShowcase__wrapper text-white'>
                <h1 className='commentShowcase__title'>WHAT OUR REVIEWS SAY</h1>
                <Error />
            </div>
        </div>
    }

    if (loading) {
        return <div className="commentShowcase__background">
            <div className='commentShowcase__wrapper'>
                <h1 className='commentShowcase__title'>WHAT OUR REVIEWS SAY</h1>
                <Swiper
                    slidesPerView={totalComment}
                    autoFocus
                    autoplay
                    spaceBetween={40}
                    pagination={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Comment data={null} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    }

    return (
        <div className="commentShowcase__background">
            <div className='commentShowcase__wrapper'>
                <h1 className='commentShowcase__title'>WHAT OUR REVIEWS SAY</h1>
                <Swiper
                    slidesPerView={totalComment}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {
                        comments && comments.map((cmt, idx) => {
                            return <SwiperSlide key={idx}>
                                <Comment data={cmt} />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default CommentShowcase