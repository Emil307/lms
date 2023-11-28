import { EntityNames, QueryKeys } from "@shared/constant";
import { CourseFromList, GetCoursesRequest, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursesInfinite = (data: GetCoursesRequest, enabled = true) => {
    return useInfiniteRequest<CourseFromList>(
        [
            QueryKeys.GET_COURSES_INFINITE,
            [
                EntityNames.COURSE,
                EntityNames.LESSON,
                EntityNames.CATEGORY,
                EntityNames.GROUP,
                EntityNames.TAG,
                EntityNames.COURSE_COLLECTION,
                EntityNames.COURSE_PACKAGE,
            ],
            data,
        ],
        ({ pageParam = 1 }) => courseApi.getCourses({ ...data, page: pageParam }),
        {
            enabled,
        }
    );
};
