import { CreateArticleRequest } from "@entities/article";

export const initialValues: CreateArticleRequest = {
    name: "",
    content: "",
    isActive: false,
    categoryId: null,
    subcategories: [],
    tags: [],
};
