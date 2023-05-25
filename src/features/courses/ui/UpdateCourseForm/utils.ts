import { AdminCourse, UpdateCourseFormValues, UpdateCourseRequest } from "@entities/course";
import dayjs from "dayjs";
import { initialValues } from "./constants";

export const adaptDataForUpdateCourseForm = (data: AdminCourse): UpdateCourseFormValues => {
    const {
        discount,
        type,
        category,
        subcategory,
        teachers,
        authors,
        tags,
        price,
        description,
        createdAt,
        updatedAt,
        discountPrice,
        id,
        ...rest
    } = data;
    return {
        ...rest,
        isInteractive: type === "interactive",
        description: description ?? "",
        category: category?.id.toString() ?? "",
        subCategory: subcategory?.id.toString() ?? "",
        teacherIds: teachers.map((teacher) => teacher.id.toString()),
        authorIds: authors.map((author) => author.id.toString()),
        tagIds: tags.map((tag) => tag.id.toString()),
        price: price.toString(),
        discount: discount ? { ...discount, amount: discount.amount.toString() } : initialValues.discount,
    };
};

export const adaptUpdateCourseRequest = (id: string, data: UpdateCourseFormValues): UpdateCourseRequest => {
    const { discount, isInteractive, cover, teacherIds, authorIds, ...rest } = data;
    return {
        id,
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
