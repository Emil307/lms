import { UpdateArticleFormValidation } from "./types";

export const initialValues: UpdateArticleFormValidation = {
    name: "",
    content: "",
    isActive: false,
    categoryId: null,
    subcategories: [],
    tags: [],
};
