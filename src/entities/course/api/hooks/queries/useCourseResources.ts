import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi } from "@entities/course";

export const useCourseResources = () => {
    return useQuery([QueryKeys.GET_COURSE_RESOURCES], () => courseApi.getCourseResources());
};
