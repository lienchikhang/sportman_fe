'use client';
import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../libs/styles/ui/searchbar.scss';
import { usePathname, useRouter } from 'next/navigation';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress } from '@mui/material';
import { debounce } from '@/libs/funcs/inputFuncs';
import { motion } from 'framer-motion';
import { container, item } from '@/libs/constants/component';


interface ISearchItem {

}

const SearchBar = () => {

    const [items, setItems] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isRecOpen, setRecOpen] = useState(false);
    const [input, setInput] = useState('');
    const router = useRouter();
    const path = usePathname();

    const handleClickItem = (endpoint: string) => {
        // router.push(endpoint);
        console.log({ endpoint, })
        setRecOpen(false);

        setTimeout(() => {
            router.push(`/?name=${endpoint}`);
        }, 300);
    }

    const handleInput = useCallback((value: string) => {
        if (!value) {
            setTimeout(() => {
                setLoading(false);
                setRecOpen(false);
            }, 1000)
            return;
        }

        console.log("User input:", value);

        setTimeout(() => {
            setItems(['hdawd', 'wead', 'hdawd', 'wead', 'hdawd', 'wead']);
            setLoading(false);
        }, 1000);
    }, []);

    const debouncedHandleInputChange = useCallback(debounce(handleInput, 1000), [handleInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setRecOpen(true);
        setInput(e.currentTarget.value);
        debouncedHandleInputChange(e.currentTarget.value);
    }

    return (
        <div className='search__wrapper'>
            <div className="bar">
                <div className='input'>
                    <input
                        type="text"
                        placeholder="I'm shopping for..."
                        onChange={handleInputChange}
                    />
                    <button><SearchIcon /></button>
                </div>
            </div>
            <div className={`recommend__wrapper`}>
                {isLoading ? (
                    <div className={`recommend-loading`}>
                        <div className='flex gap-3 items-center'>
                            <CircularProgress style={{ width: '19px', height: '19px' }} />
                            <span>Loading</span>
                        </div>
                    </div>
                ) : (
                    <motion.ul
                        className="recommend"
                        variants={container}
                        initial="hidden"
                        animate={isRecOpen ? "visible" : "hidden"}
                    >
                        {items.map((action, index) => (
                            <motion.li
                                key={index}
                                className="item"
                                variants={item}
                                // whileHover={{ scale: 1.1 }}
                                whileTap={{
                                    scale: 0.6,
                                    borderRadius: "100%",
                                }}
                                onClick={() => handleClickItem(action)}
                            >
                                <p>
                                    {action.toUpperCase()}
                                </p>

                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </div>
    )
}

export default SearchBar