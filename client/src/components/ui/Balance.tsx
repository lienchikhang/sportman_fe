'use client';
import { Tooltip } from '@mui/material'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import '../../libs/styles/ui/balance.scss';
import { convertPrice } from '@/libs/funcs/priceFuncs';

const Balance = () => {

    const [price, setPrice] = useState(0);

    return (
        <Tooltip title="Account Balance">
            <motion.div
                whileHover={{ scale: 1.0, }}
                whileTap={{
                    scale: 0.6,
                    borderRadius: "100%"
                }}
                transition={{
                    // type: "spring",
                    // stiffness: 140,
                    // damping: 20,
                    duration: .4
                }}
            >

                {
                    price ? <div className='balance__wrapper'>
                        <AccountBalanceWalletIcon />
                        <span>{convertPrice(price.toLocaleString())}</span>
                    </div> : <div className='balance__wrapper'>
                        <AccountBalanceWalletIcon />
                    </div>
                }
            </motion.div>
        </Tooltip>
    )
}

export default Balance