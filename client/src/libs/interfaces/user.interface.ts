export interface IUser {
    username: string,
    avatar: string | null,
    balance: number,
}

export interface IUserContextType {
    user: IUser | null;
    login: (userData: IUser) => void;
    logout: () => void;
}
