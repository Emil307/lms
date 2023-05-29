import dayjs from "dayjs";
import { AdminArticlePackageDetails, UpdateAdminArticlePackageRequest } from "@entities/articlePackage";
import { UpdateArticlePackageFormValidation } from "./types";

export const adaptDataForEditArticlePackageForm = (
    articlePackage?: AdminArticlePackageDetails
): Partial<UpdateArticlePackageFormValidation> => {
    return {
        ...articlePackage,
        discountIsActive: !!articlePackage?.discount,
        discount: {
            amount: articlePackage?.discount?.amount || null,
            type: articlePackage?.discount?.type || "percentage",
            startingDate: articlePackage?.discount?.startingDate ? String(articlePackage.discount.startingDate) : "",
            finishingDate: articlePackage?.discount?.finishingDate ? String(articlePackage.discount.finishingDate) : "",
        },
        categories: articlePackage?.categories.map(({ id }) => id.toString()) || [],
        tags: articlePackage?.tags.map(({ id }) => id.toString()) || [],
    };
};

export const adaptUpdateArticlePackageFormRequest = (data: UpdateArticlePackageFormValidation): UpdateAdminArticlePackageRequest => {
    return {
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.categories.map((categoryId) => Number(categoryId)),
        tags: data.tags.map((tagId) => Number(tagId)),
        isActive: data.isActive,

        ...(data.discountIsActive && {
            discount: data.discount && {
                ...data.discount,
                startingDate: dayjs(data.discount.startingDate).format("YYYY.MM.DD"),
                finishingDate: dayjs(data.discount.finishingDate).format("YYYY.MM.DD"),
            },
        }),
    };
};
