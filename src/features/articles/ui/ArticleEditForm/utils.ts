import { GetAdminArticleResourcesCreateResponse, GetAdminArticleResponse, UpdateArticleRequest } from "@entities/article";
import { UpdateArticleFormValidation } from "./types";

interface TAdaptEditFormValuesProps {
    data?: GetAdminArticleResponse;
    resource?: GetAdminArticleResourcesCreateResponse;
}

export const adaptEditFormValues = ({ data, resource }: TAdaptEditFormValuesProps): Partial<UpdateArticleFormValidation> => {
    return {
        ...data,
        categoryId: resource?.categories.find((category) => category.name === data?.category.name)?.id.toString() || null,
        subcategories: resource?.subcategories.map((tag) => tag.id.toString()),
        tags: data?.tags.map((tag) => tag.id.toString()),
    };
};

export const adaptEditFormRequest = (data: UpdateArticleFormValidation): Omit<UpdateArticleRequest, "id"> => {
    return {
        ...data,
        categoryId: Number(data.categoryId),
        subcategories: data.subcategories.map((subcategory) => Number(subcategory)),
        tags: data.tags?.map((tag) => Number(tag)),
    };
};
