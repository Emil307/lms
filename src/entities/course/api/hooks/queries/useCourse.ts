import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetCourseRequest, courseApi } from "@entities/course";

export const useCourse = ({ id }: GetCourseRequest) => {
    return useQuery([QueryKeys.GET_COURSE, id], () => courseApi.getCourse({ id }), { enabled: !!id });
};
