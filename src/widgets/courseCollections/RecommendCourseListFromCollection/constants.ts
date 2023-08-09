import { TDefaultRequestParams } from "@shared/types";
import { GetRandomCourseCollectionRequest } from "@entities/courseCollection";

export const initialParamsForCollection: GetRandomCourseCollectionRequest = {
    limit: 1,
};

export const initialParamsForCourses: TDefaultRequestParams = {
    page: 1,
    perPage: 10,
};
