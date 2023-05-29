import { CreateCoursePackageFormValidation } from "./types";

export const initialValues: CreateCoursePackageFormValidation = {
    isActive: false,
    name: "",
    price: null,
    description: "",
    hasDiscount: false,
    cover: null,
    discount: {
        type: "percentage",
        amount: null,
        startingDate: null,
        finishingDate: null,
    },
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];
