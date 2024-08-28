import { UpdateCourseCollectionFormValidation } from "./types";
import { UpdateAdminCourseCollectionRequest } from "@entities/courseCollection";

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
