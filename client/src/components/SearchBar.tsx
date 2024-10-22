'use client';
import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../libs/styles/ui/searchbar.scss';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { debounce } from '@/libs/funcs/inputFuncs';
import { motion } from 'framer-motion';
import { container, item } from '@/libs/constants/component';
import http from '@/libs/configs/http';
import { Error, HightLightWord } from './ui';


interface ISearchItem {
    productName: string,
}

const SearchBar = () => {

    const [items, setItems] = useState<ISearchItem[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isRecOpen, setRecOpen] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [curValue, setValue] = useState('');
    const router = useRouter();
    // const path = usePathname();

    console.log({ items });

    const handleClickItem = (endpoint: string) => {
        // router.push(endpoint);
        console.log({ endpoint, })
        setRecOpen(false);

        setTimeout(() => {
            router.push(`/products?page=1&pageSize=25&name=${endpoint}`);
        }, 300);
    }

    const handleInput = useCallback((value: string) => {
        if (!value) {
            setTimeout(() => {
                setLoading(false);
                setRecOpen(false);
                setItems([]);
            }, 1000)
            return;
        }

        console.log("User input:", value);
        setValue(value);


        setTimeout(() => {

            http.get(`products/get-list-name?name=${value}&page=${curPage}`)
                .then((res) => {
                    if (res?.status != 200) { setHasError(true); return; }
                    console.log({ data: res.data });
                    setItems(res?.data?.content?.products);
                    setTotalPage(res?.data?.content?.totalPage);
                    setTotalElements(res?.data?.content?.totalElements);
                    setCurPage(res?.data?.content?.currentPage);
                })
                .catch(err => { setHasError(true); setLoading(false) })

            // setItems(['hdawd', 'wead', 'hdawd', 'wead', 'hdawd', 'wead']);
            setLoading(false);
        }, 1000);
    }, []);

    const debouncedHandleInputChange = useCallback(debounce(handleInput, 1000), [handleInput]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setLoading(true);
        setRecOpen(true);
        // setInput(e.currentTarget.value);
        debouncedHandleInputChange(e.currentTarget.value);
    }

    const handleShowMore = () => {
        http.get(`products/get-list-name?name=${curValue}&page=${curPage + 1}`)
            .then((res) => {
                if (res?.status != 200) { setHasError(true); return; }
                setItems((prev) => [...prev, ...res?.data?.content?.products]);
                setCurPage(res?.data?.content?.currentPage);
            })
            .catch(err => { setHasError(true); setLoading(false) })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setRecOpen(false);
            e.currentTarget.blur();
            router.push(`/products?page=1&pageSize=25&name=${e.currentTarget.value}`);
        }
    };

    if (hasError) {
        return <div className='search__wrapper'>
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
                <motion.ul
                    className="recommend p-6"
                    variants={container}
                    initial="hidden"
                    animate={isRecOpen ? "visible" : "hidden"}
                >
                    <Error />
                </motion.ul>
            </div>
        </div>
    }

    return (
        <div className='search__wrapper'>
            <div className="bar">
                <div className='input'>
                    <input
                        type="text"
                        placeholder="I'm shopping for..."
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
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
                        <p className='recommend__total'>TOTAL RESULT: {totalElements}</p>
                        {
                            items.length ? items.map((action, index) => (
                                <motion.li
                                    key={index}
                                    className="item"
                                    variants={item}
                                    // whileHover={{ scale: 1.1 }}
                                    whileTap={{
                                        scale: 0.6,
                                        borderRadius: "100%",
                                    }}
                                    onClick={() => handleClickItem(action.productName)}
                                >
                                    <HightLightWord sentence={action?.productName} word={curValue} />

                                </motion.li>
                            )) :
                                <div className='px-4 py-2'>
                                    <p className='font-medium'>Oop! Cannot find any product</p>
                                </div>
                        }
                        {

                            totalPage > curPage && <motion.li
                                onClick={handleShowMore}
                            >
                                <p className='recommend__show'>Show more...</p>
                            </motion.li>
                        }
                    </motion.ul>
                )}
            </div>
        </div>
    )
}

export default SearchBar