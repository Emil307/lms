import { CreateArticleFormValidation } from "./types";

export const initialValues: CreateArticleFormValidation = {
    name: "",
    content: "",
    isActive: false,
    categoryId: "",
    subcategories: [],
    tags: [],
};
