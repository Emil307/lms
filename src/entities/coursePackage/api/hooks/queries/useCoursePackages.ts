import { EntityNames, QueryKeys } from "@shared/constant";
import { CoursePackage, GetCoursePackagesRequest, coursePackageApi } from "@entities/coursePackage";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursePackages = (params: GetCoursePackagesRequest, enabled?: boolean) => {
    return useInfiniteRequest<CoursePackage>(
        [QueryKeys.GET_COURSE_PACKAGES, [EntityNames.COURSE_PACKAGE, EntityNames.COURSE], params],
        ({ pageParam = 1 }) => coursePackageApi.getCoursePackages({ ...params, page: pageParam }),
        { enabled }
    );
};
