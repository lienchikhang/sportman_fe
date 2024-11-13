'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IAddressContextType } from '../interfaces/context.interface';
import { ICart } from '../interfaces/order.interface';

const AddressContext = createContext<IAddressContextType | undefined>(undefined);

interface ChoiceProviderProps {
    children: ReactNode;
}

export const AddressProvider: FC<ChoiceProviderProps> = ({ children }) => {
    const [finalAddress, setAddress] = useState('');
    const [provinceId, setProvinceId] = useState(0);
    const [distinctId, setDistinctId] = useState(0);

    const handleSetProvince = (province: number) => {
        setProvinceId(province);
    };
    const handleSetDistinct = (distinct: number) => {
        setDistinctId(distinct);
    };
    const handleSetAddress = (address: string) => {
        setAddress(address);
    };

    return (
        <AddressContext.Provider value={{ finalAddress, provinceId, distinctId, handleSetAddress, handleSetDistinct, handleSetProvince }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = (): IAddressContextType => {
    const context = useContext(AddressContext);
    if (context === undefined) {
        throw new Error('useAddress must be used within a AddressProvider');
    }
    return context;
};

