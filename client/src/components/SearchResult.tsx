'use client';
import React from 'react';
import NameFilter from './NameFilter';
import { convertText } from '@/libs/funcs/textFuncs';

interface Props {
    nameFilter: string | null,
}

const SearchResult: React.FC<Props> = ({ nameFilter }) => {
    return (
        <React.Fragment>
            <div className='flex items-center gap-2'>
                <h1>
                    <span className='strong'>
                        {nameFilter ? convertText(nameFilter, 30).toUpperCase().replaceAll("-", " ") : "ALL JERSEYS"}</span>
                    {/* <span className='font-semibold'>{totalResult} Results</span> for <span className='strong'>
                        {nameFilter ? convertText(nameFilter, 30).toUpperCase().replaceAll("-", " ") : "ALL"}</span> */}
                </h1>
                {
                    nameFilter && <NameFilter />
                }
            </div>
        </React.Fragment>
    )
}

export default SearchResult