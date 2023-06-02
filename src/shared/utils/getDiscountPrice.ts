import { Discount } from "@shared/types";

export interface GetDiscountPriceProps {
    price?: number | null;
    amountDiscount?: number | null;
    type?: Discount["type"];
}

export const getDiscountPrice = ({ price, amountDiscount, type }: GetDiscountPriceProps) => {
    if (!price || !amountDiscount || !type) {
        return "";
    }
    if (type === "percentage") {
        return `${Math.floor(price - price * (amountDiscount / 100)).toLocaleString("ru")} ₽`;
    }

    return `${(price - amountDiscount).toLocaleString("ru")} ₽`;
};
