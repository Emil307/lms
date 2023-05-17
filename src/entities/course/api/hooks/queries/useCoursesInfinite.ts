import { QueryKeys } from "@shared/constant";
import { Course, GetCoursesInfiniteRequest, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursesInfinite = (data: GetCoursesInfiniteRequest) => {
    return useInfiniteRequest<Course>([QueryKeys.GET_COURSES_INFINITE, data], () => courseApi.getCourses(data));
};
