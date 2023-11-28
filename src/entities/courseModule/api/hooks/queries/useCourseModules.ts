import { EntityNames, QueryKeys } from "@shared/constant";
import { courseModuleApi, CourseModuleWithoutLessons, GetCourseModulesRequest } from "@entities/courseModule";
import { useInfiniteRequest } from "@shared/utils";

export const useCourseModules = (data: Omit<GetCourseModulesRequest, "page">) => {
    return useInfiniteRequest<CourseModuleWithoutLessons>(
        [QueryKeys.GET_ADMIN_COURSE_MODULES, [EntityNames.COURSE_MODULE, EntityNames.COURSE], data.courseId],
        ({ pageParam = 1 }) => courseModuleApi.getCourseModules({ ...data, page: pageParam }),
        { enabled: !!data.courseId }
    );
};
