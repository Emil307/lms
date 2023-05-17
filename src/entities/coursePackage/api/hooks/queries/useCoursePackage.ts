import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { CoursePackageDetail, coursePackageApi } from "@entities/coursePackage";

export const useCoursePackage = (id?: string) => {
    return useQuery<CoursePackageDetail>([QueryKeys.GET_COURSE_PACKAGE, id], () => coursePackageApi.getCoursePackage(id), {
        enabled: !!id,
    });
};
