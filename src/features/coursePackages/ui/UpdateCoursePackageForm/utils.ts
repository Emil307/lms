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
        price: data.price ? Number(data.price) : 0,
        hasDiscount: data.hasDiscount,
        coverId: data.cover?.id,

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

export const adaptUpdateCoursePackageForm = (data?: AdminCoursePackageDetails): UpdateCoursePackageFormValidation => {
    return {
        ...initialValues,
        ...data,
        price: String(data?.price),
        discount: data?.discount
            ? {
                  ...data.discount,
                  amount: String(data.discount.amount),
                  startingDate: new Date(String(data.discount.startingDate)),
                  finishingDate: new Date(String(data.discount.finishingDate)),
              }
            : initialValues.discount,
    };
};
