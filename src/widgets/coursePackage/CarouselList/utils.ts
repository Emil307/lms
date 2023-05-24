import { CoursePackagesFiltersForm, GetCoursePackagesRequest } from "@entities/coursePackage";

export const adaptDataForUpdateAboutForm = ({ exceptionCoursePackageId, ...rest }: CoursePackagesFiltersForm): GetCoursePackagesRequest => {
    return {
        ...rest,
        filter: {
            ...(exceptionCoursePackageId && {
                id: {
                    items: [exceptionCoursePackageId],
                    operator: "not",
                },
            }),
        },
    };
};
