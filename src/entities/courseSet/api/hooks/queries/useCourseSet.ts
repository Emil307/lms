import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { CourseSet, courseSetApi, GetCourseSetRequest } from "@entities/courseSet";

export const useCourseSet = (params: GetCourseSetRequest) => {
    return useQuery<CourseSet>([QueryKeys.GET_COURSE_SET, params], () => courseSetApi.getCourseSet(params));
};
