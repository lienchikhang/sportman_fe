'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IChoiceContextType } from '../interfaces/context.interface';
import { ICart } from '../interfaces/order.interface';

const ChoiceContext = createContext<IChoiceContextType | undefined>(undefined);

interface ChoiceProviderProps {
    children: ReactNode;
}

export const ChoiceProvider: FC<ChoiceProviderProps> = ({ children }) => {
    const [curChoice, setCurChoice] = useState('');

    const handleSetChoice = (newChoice: string) => {
        setCurChoice(newChoice);
    }

    return (
        <ChoiceContext.Provider value={{ curChoice, handleSetChoice }}>
            {children}
        </ChoiceContext.Provider>
    );
};

export const useChoice = (): IChoiceContextType => {
    const context = useContext(ChoiceContext);
    if (context === undefined) {
        throw new Error('useChoice must be used within a <Choice></Choice>Provider');
    }
    return context;
};

