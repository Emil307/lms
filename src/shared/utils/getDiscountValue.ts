import { Discount } from "@shared/types";

export interface GetDiscountValueProps {
    amountDiscount?: number | null;
    type?: Discount["type"];
}

export const getDiscountValue = ({ amountDiscount, type }: GetDiscountValueProps) => {
    if (!amountDiscount || !type) {
        return "";
    }
    const value = amountDiscount.toLocaleString("ru");
    if (type === "percentage") {
        return value + "%";
    }
    return `${value} ₽`;
};
