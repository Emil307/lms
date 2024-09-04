import dayjs from "dayjs";
import { AdminCourse, UpdateCourseFormValues, UpdateCourseRequest } from "@entities/course";
import { initialValues } from "./constants";

export const adaptDataForUpdateCourseForm = (data: AdminCourse): UpdateCourseFormValues => {
    const {
        isActive = false,
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
        shortDescription,
        createdAt,
        updatedAt,
        discountPrice,
        price,
        id,
        ...rest
    } = data;
    return {
        ...rest,
        isActive,
        isPopular,
        hasTeachers,
        hasAuthors,
        hasDiscount,
        price: price ? String(price) : "0",
        isInteractive: type === "interactive",
        shortDescription: shortDescription ?? "",
        description: description ?? "",
        category: category?.id.toString() ?? "",
        subCategory: subcategory?.id.toString() ?? "",
        teacherIds: teachers.map((teacher) => String(teacher.id)),
        authorIds: authors.map((author) => String(author.id)),
        tagIds: tags.map((tag) => String(tag.id)),
        discount: discount
            ? {
                  ...discount,
                  amount: discount.amount ? String(discount.amount) : "",
                  startingDate: new Date(String(discount.startingDate)),
                  finishingDate: new Date(String(discount.finishingDate)),
              }
            : initialValues.discount,
    };
};

export const adaptUpdateCourseRequest = (id: string, data: UpdateCourseFormValues): UpdateCourseRequest => {
    const { price, category, subCategory, discount, isInteractive, cover, teacherIds, authorIds, ...rest } = data;
    return {
        id,
        ...rest,
        price: Number(price) || 0,
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
