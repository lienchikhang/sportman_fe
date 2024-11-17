export interface IOrder {
    orderId: string,
    productId: string,
    sizeTag: string,
    amount: number,
    productPrice: number,
}

export interface ICart extends IOrder {
    frontImage: string,
    productName: string,
}

export interface IOrderItem {
    orderId: string,
    createdAt: string,
    status: string,
}