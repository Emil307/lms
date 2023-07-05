import { GetAdminSubCategoriesRequest } from "@entities/category";
import { CreateArticleFormValidation } from "./types";

export const initialParams: Omit<GetAdminSubCategoriesRequest, "filter"> = {
    page: 1,
    perPage: 10,
    paginate: false,
};

export const initialValues: CreateArticleFormValidation = {
    name: "",
    content: "",
    isActive: false,
    categoryId: "",
    subcategories: [],
    tags: [],
};
