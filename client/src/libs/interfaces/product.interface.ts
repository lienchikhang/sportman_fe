export interface IProduct {
    id: string,
    productName: string,
    productPrice: number,
    frontImage: string,
    backImage: string,
    colors: string[],
}

export interface IQuery {
    page: string,
    pageSize: string,
    sort: string,
    season?: string,
    price?: string,
    size?: string,
}

export interface IContent {
    products: IProduct[],
    currentPage: number,
    totalPage: number,
    totalElements: number,
}

export interface IData {
    statusCode: number,
    content: IContent,
}