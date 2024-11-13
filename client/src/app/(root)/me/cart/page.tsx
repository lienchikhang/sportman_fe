import React from 'react';
import '../../../../libs/styles/cartPage.scss';
import OrderForm from '@/components/OrderForm';
import { OrderProvider } from '@/libs/contexts/order.context';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import CartSection from '@/components/CartSection';
import OrderConfirm from '@/components/order/OrderConfirm';

const CartPage = async () => {

    const local = cookies().get('access')?.value;

    if (!local) return notFound();

    const cart = await fetch(`http://localhost:8080/sportman/carts?pageSize=6`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${local}`
        }
    }).then((res) => res.json());

    return (
        <div className='cartPage__wrapper'>
            <OrderProvider>
                <div className="cartPage__left">
                    <h1 className='title'>Order Information</h1>
                    <div className="cartPage__form">
                        <OrderForm />
                    </div>
                </div>
                <div className="cartPage__right">
                    <CartSection content={cart?.content} />
                </div>
                <OrderConfirm />
            </OrderProvider>
        </div>
    )
}

export default CartPage;