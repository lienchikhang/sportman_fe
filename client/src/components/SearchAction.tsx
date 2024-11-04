'use client';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '@/libs/contexts/search.context';


const SearchAction = () => {

    const { handleToggle } = useSearch();

    const handleActive = () => {
        handleToggle(true);
    }

    return (
        <div className="bar">
            <div className='input'>
                <input
                    type="text"
                    onFocus={handleActive}
                    placeholder="I'm shopping for..."
                />
                <button><SearchIcon /></button>
            </div>
        </div>
    )
}

export default SearchAction