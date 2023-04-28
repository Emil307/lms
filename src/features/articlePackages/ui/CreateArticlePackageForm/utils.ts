import dayjs from "dayjs";
import { CreateAdminArticlePackageRequest } from "@entities/articlePackage";
import { CreateArticlePackageFormValidation, TGetDiscountPrice } from "./types";

export const adaptCreateArticlePackageFormRequest = (data: CreateArticlePackageFormValidation): CreateAdminArticlePackageRequest => {
    const { discountIsActive, ...discount } = data.discount;
    return {
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.categories.map((categoryId) => Number(categoryId)),
        tags: data.tags.map((tagId) => Number(tagId)),
        isActive: data.isActive,

        ...(discountIsActive && {
            discount: {
                ...discount,
                amount: discount.amount || null,
                startingDate: dayjs(discount.startingDate).format("YYYY.MM.DD"),
                finishingDate: dayjs(discount.finishingDate).format("YYYY.MM.DD"),
            },
        }),
    };
};

export const getDiscountPrice = ({ price, amountDiscount, type }: TGetDiscountPrice) => {
    if (!price || !amountDiscount) {
        return "";
    }
    if (type == "percentage") {
        return `${Math.floor(price - price * (amountDiscount / 100)).toLocaleString("ru")} ₽`;
    }

    return `${(price - amountDiscount).toLocaleString("ru")} ₽`;
};
