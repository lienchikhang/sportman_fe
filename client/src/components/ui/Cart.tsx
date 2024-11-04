'use client';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useUser } from '@/libs/contexts/user.context';
import http from '@/libs/configs/http';
import { useRouter } from 'next/navigation';

const Cart = () => {

    const [totalItem, setTotalItem] = useState(0);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {

        //check has user loggedIn yet?
        //case:: hasn't loggedIn
        if (!user) {
            setTotalItem(0);
            return;
        }

        //case:: already loggedIn
        http.get(`/carts`, true)
            .then((res) => {
                console.log({ res });
                setTotalItem(res?.data?.content?.totalElements);
            })
            .catch((err) => {
                setTotalItem(0);
            })

    }, [user]);

    const handleClick = () => {
        router.push(`/me/cart`);
    }

    return (
        <Tooltip title="cart">
            <motion.div
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                    scale: 0.8,
                    borderRadius: "100%"
                }}
            >

                <div className='cart__wrapper'>
                    <span>{totalItem}</span>
                    <ShoppingCartIcon />
                </div>
            </motion.div>
        </Tooltip>
    )
}

export default Cart