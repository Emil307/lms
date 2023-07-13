import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetCourseCollectionsRequest, GetCourseCollectionsResponse, courseCollectionApi } from "@entities/courseCollection";

export const useCourseCollections = (params: GetCourseCollectionsRequest, enabled?: boolean) => {
    return useQuery<GetCourseCollectionsResponse>(
        [QueryKeys.GET_COURSE_COLLECTIONS, params],
        () => courseCollectionApi.getCourseCollections(params),
        {
            enabled,
        }
    );
};
