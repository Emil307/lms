import dayjs from "dayjs";
import { AdminCourse, UpdateCourseFormValues, UpdateCourseRequest } from "@entities/course";
import { initialValues } from "./constants";

export const adaptDataForUpdateCourseForm = (data: AdminCourse): UpdateCourseFormValues => {
    const {
        isActive = false,
        isDemonstrative = false,
        isPopular = false,
        hasDiscount = false,
        hasTeachers = false,
        hasAuthors = false,
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
        isActive,
        isDemonstrative,
        isPopular,
        hasTeachers,
        hasAuthors,
        hasDiscount,
        isInteractive: type === "interactive",
        description: description ?? "",
        category: category?.id.toString() ?? "",
        subCategory: subcategory?.id.toString() ?? "",
        teacherIds: teachers.map((teacher) => String(teacher.id)),
        authorIds: authors.map((author) => String(author.id)),
        tagIds: tags.map((tag) => String(tag.id)),
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
