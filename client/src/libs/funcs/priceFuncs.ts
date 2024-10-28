const convertPrice = (price: string) => {
    if (price.length == 1) return price;
    return price.split('.')[0] + ".xxx";
}

export {
    convertPrice,
}