import React from 'react'

interface Props {
    sentence: string,
    word: string,
}

const HightLightWord: React.FC<Props> = ({ sentence, word }) => {

    sentence = sentence.replaceAll("-", " ");

    let index = sentence.toLowerCase().indexOf(word.toLowerCase());

    let beforeMatch = sentence.slice(0, index);  // Chuỗi trước phần trùng
    let match = sentence.slice(index, index + word.length);  // Phần trùng
    let afterMatch = sentence.slice(index + word.length);

    return (
        <p>
            {beforeMatch}
            <span className='font-semibold text-[18px]'>{match}</span>
            {afterMatch}
        </p>
    )
}

export default HightLightWord