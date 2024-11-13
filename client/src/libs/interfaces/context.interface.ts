import { ICart, IOrder } from "./order.interface";
import { IUser } from "./user.interface";

export interface IUserContextType {
    user: IUser | null;
    login: (userData: IUser) => void;
    logout: () => void;
}

export interface ISearchContextType {
    toggle: boolean,
    handleToggle: (value: boolean) => void;
}

export interface IModalAuthContextType {
    toggle: boolean,
    handleToggle: (value: boolean) => void;
}

export interface INotificationContextType {
    toggle: boolean,
    msg: string,
    type: string,
    handleTurnOff: () => void;
    handleTurnOn: (msg: string, type: string) => void;
}


export interface ICartContextType {
    carts: ICart[],
    handleAddCart: (item: ICart) => void;
    handleRemoveCart: (item: ICart) => void;
}

export interface IChoiceContextType {
    curChoice: string,
    handleSetChoice: (choice: string) => void;
}

export interface IAddressContextType {
    provinceId: number,
    distinctId: number,
    finalAddress: string,
    handleSetProvince: (province: number) => void;
    handleSetDistinct: (distinct: number) => void;
    handleSetAddress: (address: string) => void;
}

export interface IOrderContextType {
    data: {
        address: string,
        receiver: string,
        phone: string,
        email: string,
        method: string,
        orders: IOrder[],
    },
    handleSetAddress: (address: string) => void,
    handleSetReceiver: (receiver: string) => void,
    handleSetPhone: (phone: string) => void,
    handleSetOrders: (orders: IOrder[]) => void,
    handleSetEmail: (email: string) => void
    handleSetMethod: (method: string) => void
}
