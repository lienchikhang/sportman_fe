export interface IOrder {
    productId: string,
    sizeTag: string,
    amount: number,
}

export interface ICart extends IOrder {
    frontImage: string,
    productName: string,
    productPrice: string,
}