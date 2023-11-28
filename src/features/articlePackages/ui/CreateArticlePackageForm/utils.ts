import dayjs from "dayjs";
import { CreateArticlePackageRequest } from "@entities/articlePackage";
import { CreateArticlePackageFormValidation } from "./types";

export const adaptCreateArticlePackageRequest = (data: CreateArticlePackageFormValidation): CreateArticlePackageRequest => {
    return {
        name: data.name,
        description: data.description,
        price: data.price ? Number(data.price) : 0,
        categories: data.categories.map((categoryId) => Number(categoryId)),
        tags: data.tags.map((tagId) => Number(tagId)),
        isActive: data.isActive,
        hasDiscount: data.hasDiscount,

        ...(data.hasDiscount && {
            discount: {
                ...data.discount,
                amount: data.discount.amount ? Number(data.discount.amount) : 0,
                startingDate: dayjs(data.discount.startingDate).format("YYYY-MM-DD"),
                finishingDate: dayjs(data.discount.finishingDate).format("YYYY-MM-DD"),
            },
        }),
    };
};
