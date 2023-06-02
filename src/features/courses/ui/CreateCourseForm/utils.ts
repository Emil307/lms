import dayjs from "dayjs";
import { CreateCourseFormValues, CreateCourseRequest } from "@entities/course";

export const adaptCreateCourseRequest = (data: CreateCourseFormValues): CreateCourseRequest => {
    const { category, subCategory, discount, isInteractive, cover, teacherIds, authorIds, ...rest } = data;
    return {
        ...rest,
        coverId: cover?.id ?? null,
        categoryId: Number(category) || undefined,
        subcategoryId: Number(subCategory) || undefined,
        type: isInteractive ? "interactive" : "autonomous",
        teacherIds: rest.hasTeachers ? teacherIds : [],
        authorIds: rest.hasAuthors ? authorIds : [],
        discount: rest.hasDiscount
            ? {
                  ...discount,
                  startingDate: dayjs(discount.startingDate).format("YYYY-MM-DD"),
                  finishingDate: dayjs(discount.finishingDate).format("YYYY-MM-DD"),
              }
            : null,
    };
};
