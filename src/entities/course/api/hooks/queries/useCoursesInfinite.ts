import { QueryKeys } from "@shared/constant";
import { CourseFromList, GetCoursesRequest, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursesInfinite = (data: GetCoursesRequest) => {
    return useInfiniteRequest<CourseFromList>([QueryKeys.GET_COURSES_INFINITE, data], () => courseApi.getCourses(data));
};
