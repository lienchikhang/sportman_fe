'use client';
import React, { useEffect, useState } from 'react';
import ModalCloseButton from './ModalCloseButton';
import FacebookLogin from './FacebookLogin';
import LoginForm from './LoginForm';
import { useModalAuth } from '@/libs/contexts/modal.auth.context';


const ModalAuth = () => {

    //local states
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [state, setState] = useState('login');

    //context state
    const { toggle } = useModalAuth();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Cuộn xuống, ẩn header
            setIsHidden(true);
        } else {
            // Cuộn lên, hiện header
            setIsHidden(false);
        }

        setLastScrollY(currentScrollY);
    };

    const handleChangeState = (state: string) => {
        setState(state);
    }

    if (state === 'register') {
        return <div className={`modalAuth ${isHidden ? 'mt-[144px]' : ''} ${toggle ? 'active' : 'unactive'}`}>
            <div className="modal">
                <ModalCloseButton />
                <h1 className='form__heading'>SPORT <span>CLUB</span> </h1>
                <p className='form__title'>Choose your favorite football club with <strong>SportMan</strong></p>
                <p>Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn</p>
                <p className='form__register'>Not a member?
                    {state == 'register' && <span onClick={() => handleChangeState('login')}>Login</span>}
                </p>
            </div>
        </div>
    }

    return (
        <div className={`modalAuth ${isHidden ? 'mt-[144px]' : ''} ${toggle ? 'active' : 'unactive'}`}>
            <div className="modal">
                <ModalCloseButton />
                <h1 className='form__heading'>SPORT <span>CLUB</span> </h1>
                <p className='form__title'>Choose your favorite football club with <strong>SportMan</strong></p>
                <LoginForm />
                <div className="form__divide">
                    <p>or continue with</p>
                </div>
                <div className='form__media'>
                    <FacebookLogin />
                    <FacebookLogin />
                    <FacebookLogin />
                </div>
                <p className='form__register'>Not a member?
                    {state == 'login' && <span onClick={() => handleChangeState('register')}>Register now</span>}
                    {state == 'register' && <span onClick={() => handleChangeState('login')}>Login</span>}
                </p>
            </div>
        </div>
    )
}

export default ModalAuth