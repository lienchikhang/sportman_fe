'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';
import AvatarCustom from './Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import "../../libs/styles/ui/user.scss";
import { actions, actionsNotLoggedIn } from '@/libs/constants/userHeader';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const icons = [
    <AccountBoxIcon />,
    <ShoppingBagIcon />,
    <LogoutIcon />,
]

const iconsNotLoggedIn = [
    <LoginIcon />,
    <AssignmentIndIcon />
]

const User = () => {
    const [session, setSession] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (endpoint: string) => {

    }

    if (!session) {
        return (
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                transition={{
                    duration: 0.4,
                }}
            >
                <div className='user__wrapper py-4'>
                    <PersonIcon />
                    {/* <KeyboardArrowDownIcon /> */}
                    <motion.ul
                        className="user__sub user__sub-fixed"
                        variants={container}
                        initial="hidden"
                        animate={isHovered ? "visible" : "hidden"} // Điều kiện để hiển thị animation
                    >
                        {actionsNotLoggedIn.map((action, index) => (
                            <motion.li
                                key={index}
                                className="item"
                                variants={item}
                                whileTap={{
                                    scale: 0.6,
                                    borderRadius: "100%",
                                }}
                            >
                                {iconsNotLoggedIn[index]}
                                <p>
                                    {action.toUpperCase()}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{
                duration: 0.4,
            }}
        >
            <div className='user__wrapper py-1'>
                <AvatarCustom url='' name="khang" />
                <span>{'khag'}</span>
                <KeyboardArrowDownIcon />
                <motion.ul
                    className="user__sub"
                    variants={container}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"} // Điều kiện để hiển thị animation
                >
                    {actions.map((action, index) => (
                        <motion.li
                            key={index}
                            className="item"
                            variants={item}
                            whileTap={{
                                scale: 0.6,
                                borderRadius: "100%",
                            }}
                        >
                            {icons[index]}
                            <p>
                                {action.toUpperCase()}
                            </p>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </motion.div>
    );
};

export default User