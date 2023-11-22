import dayjs from "dayjs";
import { GetAdminArticlePackageResponse, UpdateArticlePackageRequest } from "@entities/articlePackage";
import { UpdateArticlePackageFormValidation } from "./types";
import { initialValues } from "./constants";

export const adaptUpdateArticlePackageForm = (data?: GetAdminArticlePackageResponse): UpdateArticlePackageFormValidation => {
    return {
        ...initialValues,
        ...data,
        discount: {
            type: data?.discount?.type || "percentage",
            amount: data?.discount?.amount,
            startingDate: data?.discount?.startingDate ? new Date(data.discount.startingDate) : null,
            finishingDate: data?.discount?.finishingDate ? new Date(data.discount.finishingDate) : null,
        },
        price: data?.fullPrice || null,
        categories: data?.categories.map(({ id }) => id.toString()) || [],
        tags: data?.tags.map(({ id }) => id.toString()) || [],
    };
};

export const adaptUpdateArticlePackageRequest = (data: UpdateArticlePackageFormValidation): Omit<UpdateArticlePackageRequest, "id"> => {
    return {
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.categories.map((categoryId) => Number(categoryId)),
        tags: data.tags.map((tagId) => Number(tagId)),
        isActive: data.isActive,
        hasDiscount: data.hasDiscount,

        ...(data.hasDiscount && {
            discount: {
                ...data.discount,
                amount: data.discount.amount || null,
                startingDate: dayjs(data.discount.startingDate).format("YYYY-MM-DD"),
                finishingDate: dayjs(data.discount.finishingDate).format("YYYY-MM-DD"),
            },
        }),
    };
};
