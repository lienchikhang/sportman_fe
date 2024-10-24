'use client';
import React from 'react';
import NameFilter from './NameFilter';

interface Props {
    nameFilter: string | null,
}

const SearchResult: React.FC<Props> = ({ nameFilter }) => {
    return (
        <React.Fragment>
            <div className='flex items-center gap-2'>
                <h1>
                    Results for <span className='strong'>
                        {nameFilter ? nameFilter.toUpperCase().replaceAll("-", " ") : "ALL"}</span>
                </h1>
                {
                    nameFilter && <NameFilter />
                }
            </div>
        </React.Fragment>
    )
}

export default SearchResult