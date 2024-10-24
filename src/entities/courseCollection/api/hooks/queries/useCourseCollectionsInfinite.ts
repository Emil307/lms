import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { courseCollectionApi } from "../../courseCollectionApi";
import { GetCourseCollectionsRequest, CourseCollection } from "../../types";

export const useCourseCollectionsInfinite = (params: GetCourseCollectionsRequest, enabled?: boolean) => {
    return useInfiniteRequest<CourseCollection>(
        [
            QueryKeys.GET_COURSE_COLLECTIONS,
            [
                EntityNames.COURSE,
                EntityNames.LESSON,
                EntityNames.CATEGORY,
                EntityNames.GROUP,
                EntityNames.TAG,
                EntityNames.COURSE_COLLECTION,
            ],
            params,
        ],
        ({ pageParam = 1 }) => courseCollectionApi.getCourseCollectionsPaginate({ ...params, page: pageParam }),
        { enabled }
    );
};
