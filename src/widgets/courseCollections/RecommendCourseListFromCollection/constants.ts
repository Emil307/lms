import { GetRandomCourseCollectionRequest } from "@entities/courseCollection";
import { TDefaultRequestParams } from "@shared/types";

export const initialParamsForCollection: GetRandomCourseCollectionRequest = {
    limit: 1,
};

export const initialParamsForCourses: TDefaultRequestParams = {
    page: 1,
    perPage: 10,
};
