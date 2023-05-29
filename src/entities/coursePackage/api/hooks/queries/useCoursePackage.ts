import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { CoursePackageDetails, coursePackageApi } from "@entities/coursePackage";

export const useCoursePackage = (id?: string) => {
    return useQuery<CoursePackageDetails>([QueryKeys.GET_COURSE_PACKAGE, id], () => coursePackageApi.getCoursePackage(id), {
        enabled: !!id,
    });
};
