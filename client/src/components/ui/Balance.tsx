'use client';
import { Tooltip } from '@mui/material'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import '../../libs/styles/ui/balance.scss';
import { convertPrice } from '@/libs/funcs/priceFuncs';
import { useUser } from '@/libs/contexts/user.context';

const Balance = () => {

    const [price, setPrice] = useState(0);
    const { user } = useUser();

    return (
        <Tooltip title="Account Balance">
            <motion.div
                whileHover={{ scale: 1.0, }}
                whileTap={{
                    scale: 0.6,
                    borderRadius: "100%"
                }}
                transition={{
                    duration: .4
                }}
            >

                {
                    user ? <div className='balance__wrapper'>
                        <AccountBalanceWalletIcon />
                        <span>{convertPrice(user.balance.toLocaleString())}</span>
                    </div> : <div className='balance__wrapper'>
                        <AccountBalanceWalletIcon />
                    </div>
                }
            </motion.div>
        </Tooltip>
    )
}

export default Balance