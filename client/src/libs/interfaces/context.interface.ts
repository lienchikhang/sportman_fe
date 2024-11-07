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


