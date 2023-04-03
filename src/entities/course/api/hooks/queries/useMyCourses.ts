import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetMyCoursesResponse } from "@entities/course";

export const useMyCourses = () => {
    return useQuery<GetMyCoursesResponse>([QueryKeys.GET_MY_COURSES], () => courseApi.getMyCourses());
};
