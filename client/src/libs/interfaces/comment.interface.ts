export interface IComment {
    user: {
        username: string,
        fullName: string,
        avatar: string | null,
    },
    rateComment: string,
    createdAt: string,
    rateStar: number,
}