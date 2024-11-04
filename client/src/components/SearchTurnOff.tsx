'use client';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from '@/libs/contexts/search.context';

const SearchTurnOff = () => {

    const { handleToggle } = useSearch();

    const handleClick = () => {
        handleToggle(false);
    }

    return (
        <div className='search__turnoff' onClick={handleClick}>
            <ClearIcon />
        </div>
    )
}

export default SearchTurnOff