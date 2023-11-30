import dayjs from "dayjs";
import { CreateCourseFormValues, CreateCourseRequest } from "@entities/course";

export const adaptCreateCourseRequest = (data: CreateCourseFormValues): CreateCourseRequest => {
    const { price, category, subCategory, discount, isInteractive, cover, teacherIds, authorIds, ...rest } = data;
    return {
        ...rest,
        price: data.price ? Number(data.price) : 0,
        coverId: cover?.id ?? null,
        categoryId: Number(category) || undefined,
        subcategoryId: Number(subCategory) || undefined,
        type: isInteractive ? "interactive" : "autonomous",
        teacherIds: rest.hasTeachers ? teacherIds : [],
        authorIds: rest.hasAuthors ? authorIds : [],
        discount: rest.hasDiscount
            ? {
                  ...discount,
                  amount: discount.amount ? Number(discount.amount) : 0,
                  startingDate: dayjs(discount.startingDate).format("YYYY-MM-DD"),
                  finishingDate: dayjs(discount.finishingDate).format("YYYY-MM-DD"),
              }
            : null,
    };
};
