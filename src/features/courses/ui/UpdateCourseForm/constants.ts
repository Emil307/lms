import { GetAdminSubCategoriesRequest } from "@entities/category";
import { UpdateCourseFormValues } from "@entities/course";

export const initialParams: Omit<GetAdminSubCategoriesRequest, "filter"> = {
    page: 1,
    perPage: 10,
    paginate: false,
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];

export const initialValues: UpdateCourseFormValues = {
    cover: null,
    name: "",
    category: "",
    subCategory: "",
    description: "",
    duration: "",
    price: "",
    isInteractive: false,
    isActive: false,
    isPopular: false,
    hasAuthors: false,
    authorIds: [],
    hasTeachers: false,
    teacherIds: [],
    tagIds: [],
    hasDiscount: false,
    discount: {
        type: "percentage",
        amount: "",
        startingDate: null,
        finishingDate: null,
    },
};
