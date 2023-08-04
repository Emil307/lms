import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetCourseRequest, GetCourseResponse, courseApi } from "@entities/course";

export const useCourse = ({ id }: GetCourseRequest) => {
    return useQuery<GetCourseResponse>([QueryKeys.GET_COURSE, id], () => courseApi.getCourse({ id }), { enabled: !!id });
};
