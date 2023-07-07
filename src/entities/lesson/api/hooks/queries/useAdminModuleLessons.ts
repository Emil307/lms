import { useInfiniteRequest } from "@shared/utils";
import { QueryKeys } from "@shared/constant";
import { AdminLessonFromList, GetAdminLessonsFromModuleRequest, lessonApi } from "@entities/lesson";

export const useAdminModuleLessons = (data: Omit<GetAdminLessonsFromModuleRequest, "page">) => {
    return useInfiniteRequest<AdminLessonFromList>(
        [QueryKeys.GET_ADMIN_MODULE_LESSONS, data.filter.moduleIds?.items[0]],
        ({ pageParam = 1 }) => lessonApi.getAdminLessons({ ...data, page: pageParam }),
        { enabled: !!data.filter.moduleIds?.items[0] },
    );
};
