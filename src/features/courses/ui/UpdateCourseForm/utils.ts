import dayjs from "dayjs";
import { AdminCourse, UpdateCourseFormValues, UpdateCourseRequest } from "@entities/course";
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
        discount: discount
            ? {
                  ...discount,
                  startingDate: new Date(String(discount.startingDate)),
                  finishingDate: new Date(String(discount.finishingDate)),
              }
            : initialValues.discount,
    };
};

export const adaptUpdateCourseRequest = (id: string, data: UpdateCourseFormValues): UpdateCourseRequest => {
    const { category, subCategory, discount, isInteractive, cover, teacherIds, authorIds, ...rest } = data;
    return {
        id,
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
