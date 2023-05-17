import { AdminArticleDetails, GetAdminArticlesResourceResponse, UpdateArticleRequest } from "@entities/article";
import { UpdateArticleFormValidation } from "./types";

interface TAdaptEditFormValuesProps {
    data?: AdminArticleDetails;
    resource?: GetAdminArticlesResourceResponse;
}

export const adaptEditFormValues = ({ data, resource }: TAdaptEditFormValuesProps): Partial<UpdateArticleFormValidation> => {
    return {
        ...data,
        categoryId: resource?.categories.data.find((category) => category.name === data?.category.name)?.id.toString() || null,
        subcategoryId:
            resource?.subcategories.data.find((subcategory) => subcategory.name === data?.subcategory.name)?.id.toString() || null,
        tags: data?.tags.map((tag) => tag.id.toString()),
    };
};

export const adaptEditFormRequest = (data: UpdateArticleFormValidation): UpdateArticleRequest => {
    return {
        ...data,
        categoryId: Number(data.categoryId),
        subcategoryId: Number(data.subcategoryId),
        tags: data.tags?.map((tag) => Number(tag)),
    };
};
