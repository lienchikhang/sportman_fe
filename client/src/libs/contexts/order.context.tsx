'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IOrderContextType } from '../interfaces/context.interface';
import { IOrder } from '../interfaces/order.interface';

const OrderContext = createContext<IOrderContextType | undefined>(undefined);

interface ChoiceProviderProps {
    children: ReactNode;
}

export const OrderProvider: FC<ChoiceProviderProps> = ({ children }) => {
    const [data, setData] = useState({
        address: '',
        receiver: '',
        phone: '',
        email: '',
        method: 'cod',
        orders: [] as IOrder[],
    });

    const handleSetAddress = (address: string) => {
        setData(prev => ({
            ...prev,
            address,
        }));
    }

    const handleSetReceiver = (receiver: string) => {
        setData(prev => ({
            ...prev,
            receiver,
        }));
    }

    const handleSetPhone = (phone: string) => {
        setData(prev => ({
            ...prev,
            phone,
        }));
    }

    const handleSetOrders = (newOrders: IOrder[]) => {
        setData(prev => ({
            ...prev,
            orders: newOrders,
        }));
    }

    const handleSetEmail = (email: string) => {
        setData(prev => ({
            ...prev,
            email,
        }));
    }

    const handleSetMethod = (method: string) => {
        setData(prev => ({
            ...prev,
            method,
        }));
    }

    return (
        <OrderContext.Provider value={{
            data,
            handleSetAddress,
            handleSetOrders,
            handleSetPhone,
            handleSetReceiver,
            handleSetEmail,
            handleSetMethod
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = (): IOrderContextType => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

