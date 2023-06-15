import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseModuleApi, GetCourseModuleRequest } from "@entities/courseModule";

export const useCourseModule = ({ courseId, moduleId }: GetCourseModuleRequest) => {
    return useQuery([QueryKeys.GET_COURSE_MODULE, courseId, moduleId], () => courseModuleApi.getCourseModule({ courseId, moduleId }), {
        enabled: !!courseId && !!moduleId,
    });
};
