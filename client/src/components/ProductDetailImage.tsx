'use client';
import React, { CSSProperties, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {
    frontImage: string,
    backImage: string,
}

const ProductDetailImage: React.FC<Props> = ({ frontImage, backImage }) => {

    const [forward, setForward] = useState(false);
    const [backward, setBackward] = useState(true);

    const handleNextClick = () => {
        setForward(true);
        setBackward(false);
    };

    const handleNextClick2 = () => {
        setBackward(true);
        setForward(false);
    };

    console.log({ forward, backward })


    return (
        <>
            <div className={`image-container ${forward ? 'forward' : ''} ${backward ? 'backward' : ''}`}>
                <img src={frontImage} alt="Front View" className={`front-image`} />
                <img src={backImage} alt="Back View" className={`back-image`} />
            </div>
            <div className='images__nav'>
                <button className={`${forward ? 'active' : 'unactive'}`} onClick={handleNextClick2}>
                    <KeyboardArrowLeftIcon />
                </button>
                <button className={`${backward ? 'active' : 'unactive'}`} onClick={handleNextClick}>
                    <KeyboardArrowRightIcon />
                </button>
            </div>
        </>
    );
}

export default ProductDetailImage;