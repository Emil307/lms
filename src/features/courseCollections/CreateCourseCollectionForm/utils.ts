import { CreateCourseCollectionFormValidation } from "@features/courseCollections/CreateCourseCollectionForm/types";
import { CreateAdminCourseCollectionRequest } from "@entities/courseCollection";

export const adaptCreateCoursCollectionFormRequest = (data: CreateCourseCollectionFormValidation): CreateAdminCourseCollectionRequest => {
    const { cover, ...rest } = data;
    return {
        ...rest,
        coverId: cover?.id ?? null,
    };
};
