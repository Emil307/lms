import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseSetApi, CourseSetDetail } from "@entities/courseSet";

export const useCourseSet = (id: string) => {
    return useQuery<CourseSetDetail>([QueryKeys.GET_COURSE_SET, id], () => courseSetApi.getCourseSet(id), { enabled: !!id });
};
