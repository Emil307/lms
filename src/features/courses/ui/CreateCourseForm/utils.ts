import { CreateCourseFormValues, CreateCourseRequest } from "@entities/course";
import dayjs from "dayjs";

export const adaptCreateCourseRequest = (data: CreateCourseFormValues): CreateCourseRequest => {
    const { discount, isInteractive, cover, authorIds, teacherIds, ...rest } = data;
    return {
        ...rest,
        coverId: cover?.id ?? null,
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
