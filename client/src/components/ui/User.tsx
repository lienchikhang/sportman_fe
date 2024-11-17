'use client';
import React, { useEffect, useState } from 'react';
import AvatarCustom from './Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '@/libs/contexts/user.context';
import ModalAuth from '../ModalAuth';
import { ModalAuthProvider, useModalAuth } from '@/libs/contexts/modal.auth.context';
import ModalOpenButton from '../ModalOpenButton';
import { Divider, Drawer } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MapIcon from '@mui/icons-material/Map';
import { useRouter } from 'next/navigation';


const User = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { user, logout } = useUser();
    const [state, setState] = useState(false);
    const router = useRouter();

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState(open);
            };

    const handleToAccount = (route: string) => {
        router.push(route);
    }


    if (!user) {
        return <div className='user__wrapper'>
            <ModalAuthProvider>
                <ModalAuth />
                <ModalOpenButton />
            </ModalAuthProvider>
        </div>
    }

    return <>
        <div onClick={toggleDrawer(true)}>
            <AvatarCustom variant='rounded' url={user.avatar || ''} name={user.username} />
        </div>
        <button onClick={logout}>Log out</button>
        <Drawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
        >
            <div className='max-w-[480px] py-6 px-8 sticky top-0 left-0 border-b bg-white'>
                <h1 className='text-4xl'>Hi, {user.username}</h1>
            </div>
            <div className='p-8 max-w-[480px]'>
                <div className='p-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}>
                    <p className='text-base'>Pay more</p>
                    <p className='text-lg font-semibold' style={{ color: 'var(--primaryBlue)' }}>500.000VND</p>
                    <p className='text-base'>to level up your rank</p>
                </div>
                <div className='py-2 flex items-center gap-3'>
                    <div className='w-2/3 rounded-lg p-3' style={{ backgroundColor: '#f1f1f1' }} >
                        <p className='text-base'>You're having</p>
                        <p className='text-base font-semibold'>30.000 Sportcash</p>
                    </div>
                    <div className='w-1/3 rounded-lg p-3' style={{ backgroundColor: '#000000' }} >
                        <p className='text-base font-medium text-white'>SportClub</p>
                        <p className='text-base font-medium text-white'>Rewards Hub</p>
                    </div>
                </div>
                <div className='w-full rounded-xl p-4' style={{ backgroundColor: '#f1f1f1' }} >
                    <h3 className='text-sm font-semibold mb-8'>Membership profit</h3>
                    <div className='relative flex items-center bg-white rounded-md'>
                        <div className='w-[35px] h-32 relative rounded-tl-xl rounded-bl-xl border-r-2 border-dashed' style={{ borderColor: '#f1f1f1' }}>
                            <div className='w-[25px] h-[25px] rounded-full absolute top-1/2 -left-3' style={{ transform: 'translateY(-50%)', backgroundColor: '#f1f1f1' }}></div>
                        </div>
                        <div className='relative flex-1 bg-white rounded-e-xl p-3'>
                            <div className='absolute px-4 py-2 -top-2 w-[120px] h-[35px] rounded-lg' style={{ backgroundColor: 'var(--primaryBlue)' }}>
                                <p className='text-white font-medium text-sm'>Happy friday</p>
                            </div>
                            <p className='text-sm mt-5 mb-12 w-60' style={{ color: '#646262' }}>Golden day x2 refund Cportcash on friday every week.</p>
                            <p className='text-sm' style={{ color: 'var(--primaryBlue)' }}>Explore more</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center flex-wrap mt-2'>
                    <div className='w-1/3 pr-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <ConfirmationNumberIcon className='text-4xl block' />
                            <p>Vouchers</p>
                        </div>
                    </div>
                    <div className='w-1/3 p-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <HistoryToggleOffIcon className='text-4xl block' />
                            <p className='text-base font-semibold'>Histories</p>
                        </div>
                    </div>
                    <div className='w-1/3 pl-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <AccountCircleIcon className='text-4xl block' />
                            <p className='text-base font-semibold'>Settings</p>
                        </div>
                    </div>
                    <div className='w-1/3 pr-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <MapIcon className='text-4xl block' />
                            <p className='text-base font-semibold'>Addresses</p>
                        </div>
                    </div>
                    <div className='w-1/3 p-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <RateReviewIcon className='text-4xl block' />
                            <p className='text-base font-semibold'>Rates</p>
                        </div>
                    </div>
                    <div className='w-1/3 pl-2 cursor-pointer'>
                        <div className='flex flex-col items-center gap-1 py-4 px-2 rounded-lg' style={{ backgroundColor: '#f1f1f1' }}  >
                            <QuizIcon className='text-4xl block' />
                            <p className='text-base font-semibold'>FAQ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => handleToAccount('/me/info')} className='px-6 py-5 sticky bottom-0 right-0 cursor-pointer' style={{ backgroundColor: 'var(--primaryBlue)' }}>
                <p className='text-lg  text-center text-white'>Go to account management</p>
            </div>
        </Drawer>
    </>;
};

export default User