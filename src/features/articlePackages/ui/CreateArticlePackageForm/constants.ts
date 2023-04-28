import { CreateArticlePackageFormValidation } from "./types";

export const initialValues: CreateArticlePackageFormValidation = {
    isActive: false,
    name: "",
    description: "",
    price: null,
    categories: [],
    tags: [],
    discount: {
        type: "percentage",
        discountIsActive: false,
        amount: null,
        startingDate: "",
        finishingDate: "",
    },
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];
