import { UpdateArticleFormValidation } from "./types";

export const initialValues: UpdateArticleFormValidation = {
    name: "",
    content: "",
    isActive: false,
    categoryId: null,
    subcategoryId: null,
    tags: [],
};
