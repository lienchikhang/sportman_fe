'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { ISearchContextType } from '../interfaces/context.interface';

const SearchContext = createContext<ISearchContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const SearchProvider: FC<UserProviderProps> = ({ children }) => {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleToggle = (value: boolean) => {
        setToggle(value);
    }



    return (
        <SearchContext.Provider value={{ toggle, handleToggle }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): ISearchContextType => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

