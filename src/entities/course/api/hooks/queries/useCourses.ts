import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { CoursesRequestParamsType, courseApi } from "@entities/course";

export const useCourses = (data: CoursesRequestParamsType) => {
    return useQuery([QueryKeys.GET_COURSES, data], () => courseApi.getCourses(data));
};
