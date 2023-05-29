export interface GetDiscountPriceProps {
    price?: number | null;
    amountDiscount?: number | null;
    type: "percentage" | "currency";
}

export const getDiscountPrice = ({ price, amountDiscount, type }: GetDiscountPriceProps) => {
    if (!price || !amountDiscount) {
        return "";
    }
    if (type == "percentage") {
        return `${Math.floor(price - price * (amountDiscount / 100)).toLocaleString("ru")} ₽`;
    }

    return `${(price - amountDiscount).toLocaleString("ru")} ₽`;
};
