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
