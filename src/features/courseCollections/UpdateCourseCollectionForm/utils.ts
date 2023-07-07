import { GetAdminCourseCollectionResponse } from "@entities/courseCollection";
import { UpdateCourseCollectionFormValidation } from "./types";

export const adaptUpdateCourseCollectionForm = (data?: GetAdminCourseCollectionResponse): Partial<UpdateCourseCollectionFormValidation> => {
    return {
        iconName: data?.iconName,
        name: data?.name,
        description: data?.description,
        isActive: data?.isActive,
    };
};
