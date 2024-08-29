import { UpdateAdminCourseCollectionRequest } from "@entities/courseCollection";
import { UpdateCourseCollectionFormValidation } from "./types";

export const adaptUpdateCourseCollectionForm = (
    id: string,
    data?: UpdateCourseCollectionFormValidation
): UpdateAdminCourseCollectionRequest => {
    const { ...rest } = data;
    return {
        id,
        ...rest,
        coverId: data?.cover?.id ?? null,
    };
};
