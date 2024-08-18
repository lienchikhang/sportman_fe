'use client';
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Tooltip } from '@mui/material';
import '../../libs/styles/ui/cart.scss';
import { motion } from 'framer-motion';

const Cart = () => {

    const [totalItem, setTotalItem] = useState(0);

    const handleClick = () => {

    }

    return (
        <Tooltip title="cart">
            <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                    scale: 0.8,
                    borderRadius: "100%"
                }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 3
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