import { CreateArticlePackageFormValidation } from "./types";

export const initialValues: CreateArticlePackageFormValidation = {
    isActive: false,
    name: "",
    description: "",
    price: null,
    categories: [],
    tags: [],
    hasDiscount: false,
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
