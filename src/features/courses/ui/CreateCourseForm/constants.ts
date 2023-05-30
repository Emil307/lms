import { CreateCourseFormValues } from "@entities/course";

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];

export const initialValues: CreateCourseFormValues = {
    cover: null,
    name: "",
    category: "",
    subCategory: "",
    description: "",
    price: "0",
    isInteractive: false,
    isActive: false,
    isDemonstrative: false,
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