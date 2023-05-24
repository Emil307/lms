import { QueryKeys } from "@shared/constant";
import { CoursePackage, GetCoursePackagesRequest, coursePackageApi } from "@entities/coursePackage";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursePackages = (params: GetCoursePackagesRequest) => {
    return useInfiniteRequest<CoursePackage>([QueryKeys.GET_COURSE_PACKAGES, params], ({ pageParam = 1 }) =>
        coursePackageApi.getCoursePackages({ ...params, page: pageParam })
    );
};
