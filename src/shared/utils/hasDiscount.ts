import dayjs from "dayjs";
import { Discount } from "@shared/types";

interface HasDiscountProps {
    discount?: Discount | null;
    defaultPrice: number;
    discountPrice: number;
}

export const hasDiscount = ({ discount, defaultPrice, discountPrice }: HasDiscountProps) => {
    return discount && !dayjs().isAfter(discount.finishingDate) && defaultPrice !== discountPrice;
};
