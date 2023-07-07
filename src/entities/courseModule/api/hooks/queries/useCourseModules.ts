import { QueryKeys } from "@shared/constant";
import { CourseModule, courseModuleApi, GetCourseModulesRequest } from "@entities/courseModule";
import { useInfiniteRequest } from "@shared/utils";

export const useCourseModules = (data: Omit<GetCourseModulesRequest, "page">) => {
    return useInfiniteRequest<CourseModule>(
        [QueryKeys.GET_COURSE_MODULES, data.courseId],
        ({ pageParam = 1 }) => courseModuleApi.getCourseModules({ ...data, page: pageParam }),
        { enabled: !!data.courseId },
    );
};
