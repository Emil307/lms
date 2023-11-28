import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminCoursePackageResoursesRequest, GetAdminCoursePackageResoursesResponse, coursePackageApi } from "@entities/coursePackage";
import { FormErrorResponse } from "@shared/types";

export const useAdminCoursePackageResourses = (
    params: GetAdminCoursePackageResoursesRequest
): UseQueryResult<GetAdminCoursePackageResoursesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_COURSE_PACKAGE_RESOURCES, [EntityNames.ARTICLE_PACKAGE, EntityNames.COURSE], params], () =>
        coursePackageApi.getAdminCoursePackageResourses(params)
    );
};
