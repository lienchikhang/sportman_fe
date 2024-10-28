'use client';
import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { IUser, IUserContextType } from '../interfaces/user.interface';
import http from '../configs/http';
import { cookies } from 'next/headers';

const UserContext = createContext<IUserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        console.log('set user from local')
        const localStore = localStorage.getItem('user');
        if (!localStore) return;
        const localUser = JSON.parse(localStore);
        setUser({ ...localUser });
    }, []);

    const login = (userData: IUser) => {
        setUser(userData);
    };

    const logout = async () => {

        //get cookie
        const cookie = await fetch("/api/get-token", {
            method: "GET",
        }).then((res) => res.json());

        http.post(`/auth/logout`, {
            token: cookie?.token,
        })
            .then((res) => {
                if (res?.status == 200) {

                    //remove in local
                    localStorage.removeItem('user');

                    //remove in context
                    setUser(null);

                    //remove cookie in server
                    fetch("/api/remove-token", {
                        method: "DELETE",
                    })
                        .then((res) => res.json())
                        .then((res) => console.log('success remove cookie in server', res))
                        .catch((err) => console.log('err in remove cookie'));
                }
            })
            .catch((err) => {
                console.log('err in logout', err);
            })
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): IUserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

