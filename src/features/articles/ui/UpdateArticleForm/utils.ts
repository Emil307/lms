import { GetAdminArticleResponse, UpdateArticleRequest } from "@entities/article";
import { UpdateArticleFormValidation } from "./types";

export const adaptUpdateArticleFormValues = (data?: GetAdminArticleResponse): Partial<UpdateArticleFormValidation> => {
    return {
        ...data,
        categoryId: data?.category?.id.toString(),
        subcategories: data?.subcategories.map(({ id }) => id.toString()),
        tags: data?.tags.map(({ id }) => id.toString()),
    };
};

export const adaptUpdateArticleRequest = (data: UpdateArticleFormValidation): Omit<UpdateArticleRequest, "id"> => {
    return {
        ...data,
        categoryId: Number(data.categoryId),
    };
};
