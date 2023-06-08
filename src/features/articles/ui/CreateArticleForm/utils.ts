import { CreateArticleRequest } from "@entities/article";
import { CreateArticleFormValidation } from "./types";

export const adaptCreateArticleRequest = (data: CreateArticleFormValidation): CreateArticleRequest => {
    return {
        ...data,
        categoryId: Number(data.categoryId),
    };
};
