import { GetAdminCategoryResponse } from "@entities/category";
import { UpdateAdminCategoryFormValidation } from "./types";

export const adaptUpdateCategoryForm = (data: GetAdminCategoryResponse): Partial<UpdateAdminCategoryFormValidation> => {
    const { name, isActive, parentId } = data;
    return {
        name,
        isActive,
        parentId,
    };
};
