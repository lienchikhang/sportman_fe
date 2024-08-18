const convertPrice = (price: string) => {
    return price.split('.')[0] + ".xxx";
}

export {
    convertPrice,
}