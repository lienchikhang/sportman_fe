'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { ICartContextType } from '../interfaces/context.interface';
import { ICart } from '../interfaces/order.interface';
import http from '../configs/http';
import notificationEmitter from '../configs/eventDriven';
import { useUser } from './user.context';
import { useRouter } from 'next/navigation';

const CartContext = createContext<ICartContextType | undefined>(undefined);

interface ModalAuthProviderProps {
    children: ReactNode;
}

export const CartProvider: FC<ModalAuthProviderProps> = ({ children }) => {

    const [carts, setCarts] = useState<ICart[]>([]);
    const { logout } = useUser();
    const router = useRouter();

    const handleAddCart = async (item: ICart) => {
        // const idxExist = carts.findIndex(cart => cart.productId == item.productId);

        // //CASE:: not exist
        // if (idxExist == -1) {
        //     setCarts(prev => [...prev, item]);
        //     return;

        //     //CASE:: existed
        // } else {
        //     const newAmount = carts[idxExist].amount += 1;
        //     const tempItem = {
        //         ...carts[idxExist],
        //         amount: newAmount,
        //     }

        //     const newCarts = carts.splice(idxExist, 1, tempItem);
        //     // carts.splice(idxExist, 1, carts[idxExist])
        //     setCarts(newCarts);
        // }

        const { productId, amount, sizeTag } = item;

        try {

            const rs = await http.post(`/carts/add`, {
                productId,
                amount,
                sizeTag,
            }, true);

            console.log({ rs });

            if (rs?.status == 200) {
                // notificationEmitter.emit('success', rs?.data?.msg);
                notificationEmitter.emit('newCart', item);
            }

        } catch (err: any) {

            if (err?.status == 400) {
                notificationEmitter.emit('error', 'Please Login!');
            }

            if (err?.status == 401 && err?.response?.data?.msg == 'LoginExpired') {
                setTimeout(() => {
                    // setLoading(false);
                    notificationEmitter.emit('error', 'Login Expired!')
                    logout();
                    router.refresh();
                }, 1800)
            }
        }
    }

    const handleRemoveCart = (item: ICart) => {
        const idxExist = carts.findIndex(cart => cart.productId == item.productId);
        const newCarts = carts.splice(idxExist, 1);
        setCarts(newCarts);
    }

    return (
        <CartContext.Provider value={{ carts, handleAddCart, handleRemoveCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): ICartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

