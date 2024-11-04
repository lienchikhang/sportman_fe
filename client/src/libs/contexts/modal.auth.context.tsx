'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IModalAuthContextType } from '../interfaces/context.interface';

const ModalAuthContext = createContext<IModalAuthContextType | undefined>(undefined);

interface ModalAuthProviderProps {
    children: ReactNode;
}

export const ModalAuthProvider: FC<ModalAuthProviderProps> = ({ children }) => {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleToggle = (value: boolean) => {
        setToggle(value);
    }

    return (
        <ModalAuthContext.Provider value={{ toggle, handleToggle }}>
            {children}
        </ModalAuthContext.Provider>
    );
};

export const useModalAuth = (): IModalAuthContextType => {
    const context = useContext(ModalAuthContext);
    if (context === undefined) {
        throw new Error('useModalAuth must be used within a ModalAuthProvider');
    }
    return context;
};

