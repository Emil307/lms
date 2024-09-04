import dayjs from "dayjs";
import { Discount } from "@shared/types";

export interface GetDiscountValueProps {
    amountDiscount?: number | null;
    type?: Discount["type"];
    finishingDate?: Date;
}

export const getDiscountValue = ({ amountDiscount, type, finishingDate }: GetDiscountValueProps) => {
    if (!amountDiscount || !type || dayjs().isAfter(finishingDate)) {
        return "";
    }
    const value = amountDiscount.toLocaleString("ru");
    if (type === "percentage") {
        return value + "%";
    }
    return `${value} ₽`;
};
