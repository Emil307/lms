import { QueryKeys } from "@shared/constant";
import { CoursePackage, coursePackageApi } from "@entities/coursePackage";
import { useInfiniteRequest } from "@shared/utils";

export const useCoursePackages = () => {
    return useInfiniteRequest<CoursePackage>([QueryKeys.GET_COURSE_PACKAGES], () => coursePackageApi.getCoursePackages());
};
