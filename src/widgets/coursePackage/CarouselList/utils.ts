import { CoursePackagesFiltersForm, GetCoursePackagesRequest } from "@entities/coursePackage";

export const adaptGetCoursePackagesRequest = ({
    exceptionCoursePackageId,
    courseId,
    ...rest
}: CoursePackagesFiltersForm): GetCoursePackagesRequest => {
    return {
        ...rest,
        filter: {
            ...(exceptionCoursePackageId && {
                id: {
                    items: [exceptionCoursePackageId],
                    operator: "not",
                },
            }),
            ...(courseId && {
                courseIds: courseId,
            }),
        },
    };
};
