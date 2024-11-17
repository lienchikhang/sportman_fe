'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IOrderItemDetailContextType } from '../interfaces/context.interface';

const OrderItemDetailContext = createContext<IOrderItemDetailContextType | undefined>(undefined);

interface ModalAuthProviderProps {
    children: ReactNode;
}

export const OrderItemDetailProvider: FC<ModalAuthProviderProps> = ({ children }) => {
    const [orderId, setOrderId] = useState<string>('');

    const handleToggle = (value: string) => {
        setOrderId(value);
    }

    return (
        <OrderItemDetailContext.Provider value={{ orderId, handleToggle }}>
            {children}
        </OrderItemDetailContext.Provider>
    );
};

export const useOrderItemDetail = (): IOrderItemDetailContextType => {
    const context = useContext(OrderItemDetailContext);
    if (context === undefined) {
        throw new Error('useOrderItemDetail must be used within an OrderItemDetailProvider');
    }
    return context;
};

