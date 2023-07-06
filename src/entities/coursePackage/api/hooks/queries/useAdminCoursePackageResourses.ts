import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminCoursePackageResoursesRequest, GetAdminCoursePackageResoursesResponse, coursePackageApi } from "@entities/coursePackage";

export const useAdminCoursePackageResourses = (params: GetAdminCoursePackageResoursesRequest) => {
    return useQuery<GetAdminCoursePackageResoursesResponse>([QueryKeys.GET_ADMIN_COURSE_PACKAGE_RESOURCES, params], () =>
        coursePackageApi.getAdminCoursePackageResourses(params)
    );
};
