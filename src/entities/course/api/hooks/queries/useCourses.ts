import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetCoursesRequest } from "@entities/course";

export const useCourses = (data: GetCoursesRequest) => {
    return useQuery([QueryKeys.GET_COURSES, data], () => courseApi.getCourses(data));
};
