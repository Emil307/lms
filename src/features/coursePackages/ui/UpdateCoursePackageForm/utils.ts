import dayjs from "dayjs";
import { AdminCoursePackageDetails, UpdateCoursePackageRequest } from "@entities/coursePackage";
import { UpdateCoursePackageFormValidation } from "./types";
import { initialValues } from "./constants";

export const adaptUpdateCoursePackageFormRequest = (data: UpdateCoursePackageFormValidation, id: string): UpdateCoursePackageRequest => {
    return {
        id,
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

export const adaptUpdateCoursePackageForm = (data?: AdminCoursePackageDetails): UpdateCoursePackageFormValidation => {
    return {
        ...initialValues,
        ...data,
        discount: {
            type: data?.discount?.type || "percentage",
            amount: data?.discount?.amount,
            startingDate: data?.discount?.startingDate || null,
            finishingDate: data?.discount?.finishingDate || null,
        },
    };
};
