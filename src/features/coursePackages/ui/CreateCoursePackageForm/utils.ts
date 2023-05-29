import dayjs from "dayjs";
import { CreateCoursePackageRequest } from "@entities/coursePackage";
import { CreateCoursePackageFormValidation } from "./types";

export const adaptCreateCoursePackageFormRequest = (data: CreateCoursePackageFormValidation): CreateCoursePackageRequest => {
    return {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        price: data.price,
        hasDiscount: data.hasDiscount,
        coverId: data.cover?.id,

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
