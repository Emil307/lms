import { UpdateArticlePackageFormValidation } from "./types";

export const initialValues: UpdateArticlePackageFormValidation = {
    isActive: false,
    name: "",
    description: "",
    price: null,
    categories: [],
    tags: [],
    discountIsActive: false,
    discount: {
        type: "percentage",
        amount: null,
        startingDate: "",
        finishingDate: "",
    },
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];
